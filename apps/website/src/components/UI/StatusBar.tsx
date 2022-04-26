import { Box, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        width: '100%',
    },
});

export type StatusBarProps = {
    marginTop?: number;
    zIndex?: number;
}

export default function StatusBar({ marginTop, zIndex = 2 }: StatusBarProps) {
    const classes = useStyles();
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const computeProgress = () => {
            const scrolled = document.documentElement.scrollTop;
            const scrollLength = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            setProgress((100 * scrolled) / scrollLength);
        };
        window.addEventListener('scroll', computeProgress);
        return () => window.removeEventListener('scroll', computeProgress);
    });

    return (
        <Box className={classes.root} sx={{ marginTop, zIndex }}>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
}
