import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export function Loading({ text = 'Loading', customBG }: { text?: string, customBG?: string }) {
    const [dots, setDots] = useState('.');

    useEffect(() => {
        const dotsInterval = setInterval(() => dots.length < 3 ? setDots(`${dots}.`) : setDots('.'), 750);

        return () => {
            if (dotsInterval) clearInterval(dotsInterval);
        }
    }, [dots]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', bgcolor: customBG }}>
            <Typography variant="h2">{text}{dots}</Typography>
            <CircularProgress />
        </Box>
    );
}