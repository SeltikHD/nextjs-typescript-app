import { IconButton, Theme, Tooltip, Slide, useMediaQuery } from '@mui/material';
import MUIDialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { forwardRef, ReactElement, ReactNode, Ref } from 'react';
import { TransitionProps } from '@mui/material/transitions';

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
