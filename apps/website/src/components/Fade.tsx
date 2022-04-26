import type { SxProps, Theme } from '@mui/material';
import type { ElementType, ReactNode } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState, useCallback } from 'react';

export interface FadeProps {
    children?: ReactNode;
    component?: ElementType;
    sx?: SxProps<Theme>;
    yOffset?: number | string;
    delay?: number | string; // in ms
    fading?: boolean;
    afterDelay?: () => void;
    vanishingTransition?: number;
    appearingTransition?: number;
    translateY?: number;
    disabled?: boolean;
}

interface FadeStyles {
    vanishingTransition?: number;
    appearingTransition?: number;
    translateY?: number;
}

const useStyles = makeStyles<Theme, FadeStyles>(() => ({
    transparentElement: props => ({
        opacity: 0,
        transition: `${props.vanishingTransition}s`,
        transform: `translatey(${props.translateY}px)`
    }),
    visibleElement: props => ({
        opacity: 1,
        transition: `${props.appearingTransition}s`,
        transform: 'translatey(0px)'
    })
}));

export default function Fade({ children, component = "div", sx, yOffset = 0, delay = 0, fading = true, afterDelay, vanishingTransition = 1, appearingTransition = 1.5, translateY = 70, disabled }: FadeProps) {
    const self = useRef<Element>(null);
    const [visible, setVisible] = useState(false);
    const classes = useStyles({ vanishingTransition, appearingTransition, translateY });
    const firstRender = useRef(true);

    const listenToScroll = useCallback(
        (element: Element | null) => {
            if (element != null && fading) {
                const rect = element.getBoundingClientRect();
                const defaultOffset = rect.height * 0.15;

                try {
                    if (window.innerHeight <= (rect.y + defaultOffset + +yOffset) && window.innerHeight >= 0) {
                        setVisible(false);
                    } else if (firstRender.current) {
                        setTimeout(() => {
                            setVisible(true);
                            if (afterDelay) afterDelay();
                        }, +delay);
                        firstRender.current = false;
                    } else {
                        setVisible(true);
                    }
                } catch (e) { }
            }
        }, [afterDelay, delay, fading, yOffset]
    );

    useEffect(() => {
        if (!disabled) {
            listenToScroll(self.current);

            window.addEventListener("scroll", () => listenToScroll(self.current));
        } else if(afterDelay) {
            afterDelay();
        }
    }, [afterDelay, disabled, listenToScroll]);

    if (disabled) { return <>{children}</>; }

    return (
        <Box
            component={component}
            sx={{ ...sx }}
            ref={self}
            className={!visible ? classes.transparentElement : classes.visibleElement}
        >
            {children}
        </Box>
    );
}