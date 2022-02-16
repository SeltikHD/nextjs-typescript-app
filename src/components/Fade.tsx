import type { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import type { ElementType, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    children: ReactNode;
    component?: ElementType;
    sx?: SxProps<Theme>;
    yOffset?: number;
}

const useStyles = makeStyles(() => ({
    transparentElement: {
        opacity: 0,
        transition: '1.5s',
        transform: 'translatey(50px)'
    },
    visibleElement: {
        opacity: 1,
        transition: '2s',
        transform: 'translatey(0px)'
    }
}));

export default function Fade({ children, component = "div", sx, yOffset = 0 }: Props) {
    const self = useRef<Element>(null);
    const [visible, setVisible] = useState(false);
    const classes = useStyles();

    const listenToScroll = (element: Element | null) => {
        if (element != null) {
            const rect = element.getBoundingClientRect();
            try {
                if ((window.pageYOffset + window.innerHeight) - yOffset >= rect.y) {
                    setVisible(false);
                } else {
                    setVisible(true);
                }
            } catch (e) { }
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", () => listenToScroll(self.current));
    });

    return (
        <Box
            component={component}
            sx={{ ...sx }}
            ref={self}
            className={visible ? classes.transparentElement : classes.visibleElement}
        >
            {children}
        </Box>
    );
}