import type { ReactElement, ReactNode, Ref } from 'react';
import type { TransitionProps } from '@mui/material/transitions';
import type { SxProps, Theme } from '@mui/material';
import { IconButton, Tooltip, Slide, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { forwardRef } from 'react';
import dynamic from 'next/dynamic';

const MUIDialog = dynamic(() => import('@mui/material/Dialog'));
const CloseIcon = dynamic(() => import('@mui/icons-material/Close'));

export type DialogProps = {
    open: boolean;
    onClose: () => void | undefined;
    children: ReactNode;
    fullScreen?: boolean;
    sx?: SxProps<Theme>;
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

export default function Dialog({ open, onClose, children, fullScreen, sx }: DialogProps) {
    const classes = useStyles();
    const fullScreenMediaQuery = useMediaQuery('(max-width:600px)');

    return (
        <MUIDialog fullScreen={fullScreen ?? fullScreenMediaQuery} open={open} onClose={onClose} TransitionComponent={Transition} sx={sx}>
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
