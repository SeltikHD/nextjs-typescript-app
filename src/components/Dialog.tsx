import { IconButton, Theme, Tooltip } from '@mui/material';
import MUIDialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { ReactNode } from 'react';

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

export default function Dialog({ open, onClose, children }: Props) {
    const classes = useStyles();

    return (
        <MUIDialog open={open} onClose={onClose}>
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
