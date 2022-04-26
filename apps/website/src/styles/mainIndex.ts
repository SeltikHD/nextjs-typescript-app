import type { Theme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

const indexStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    bgMain: {
        boxShadow: '0 0 1rem 0 rgba(0, 0, 0, .2)',
        zIndex: 2,
        backgroundColor: 'rgba(255, 255, 255, .15)',
        backdropFilter: 'blur(5px)',
        color: theme.palette.mode === 'dark' ? grey[50] : 'black',
    },
    bgPrimary: {
        backgroundColor: theme.palette.mode === 'dark' ? '#23272E' : grey[300],
        color: theme.palette.mode === 'dark' ? grey[50] : 'black',
    },
    bgSecondary: {
        backgroundColor: theme.palette.mode === 'dark' ? grey[400] : '#23272E',
        color: theme.palette.mode === 'dark' ? 'black' : grey[50],
    },
    cards: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
}));

export default indexStyles;
