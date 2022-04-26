import { IconButton, Tooltip, Slide, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import type { Theme } from '@mui/material';
import type { ReactElement, ReactNode, Ref } from 'react';
import type { TransitionProps } from '@mui/material/transitions';

const MUIDialog = dynamic(() => import('@mui/material/Dialog'), {/* loading: () => <CircularProgress disableShrink />,*/ ssr: false });
const CloseIcon = dynamic(() => import('@mui/icons-material/Close'), {/* loading: () => <CircularProgress disableShrink />,*/ ssr: false });

type Props = {
    open: boolean;
    onClose: () => void | undefined;
    children: ReactNode;
};

const useStyles = makeStyles((theme: Theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1 / 10),
        top: theme.spacing(1 / 10)
    }
}));

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Dialog({ open, onClose, children }: Props) {
    const classes = useStyles();
    const fullScreen = useMediaQuery('(max-width:600px)');

    return (
        <MUIDialog fullScreen={fullScreen} open={open} onClose={onClose} TransitionComponent={Transition}>
            <Tooltip title="Fechar" arrow>
                <IconButton
                    size="small"
                    aria-label="exit"
                    color="inherit"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </Tooltip>
            {children}
        </MUIDialog>
    );
}
