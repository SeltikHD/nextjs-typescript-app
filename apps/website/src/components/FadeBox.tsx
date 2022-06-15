import type { ReactNode } from 'react';
import { Children, isValidElement, cloneElement } from 'react';
import { useLocalStorage } from 'react-use';

interface FadeBoxProps extends FadeProps {
    children: ReactNode;
    all?: boolean;
    component?: ReactNode;
}

const fadePropsDefault = [
    'animation',
    'duration',
    'offset',
    'disabled'
];

function extractFadeProps(className: string, fadeProps: string[]) {
    if (className.charAt(className.indexOf('fade') + 4) == '?') {
        const fadePropsString = className.substring(className.indexOf('fade') + 5, className.indexOf(';') == -1 ? className.length : className.indexOf(';'));

        const rawFadePropsArray = fadePropsString.split('&').map(fadeProp => {
            const values = fadeProp.split('=');
            return values.length == 2 && !values[1].includes(' ') ? { prop: values[0], value: values[1] } : null;
        });

        const processedFadePropsArray = rawFadePropsArray.filter(fadeProp => fadeProp != null).map(fadeProp => {
            const { prop, value } = fadeProp ?? { prop: '', value: '' };
            return fadeProps.includes(prop) ? { [prop]: value } : null;
        });

        return processedFadePropsArray.reduce((acc, fadeProp) => ({ ...acc, ...fadeProp }), {});
    }

    return {};
}

export default function FadeBox({ children, all, component = <></>, ...props }: FadeBoxProps) {
    const [animations] = useLocalStorage<boolean>('animations') ?? true;

    const fadeChildren = Children.map(children, (child) => {
        if (isValidElement(child) && ((child.props?.className?.includes("fade") || all) && !child.props?.className?.includes("skip")) && animations) {
            const className: string = child.props.className;
            const customProps = className ? extractFadeProps(className, fadePropsDefault) : {};

            return (<Fade {...props} {...customProps}>{child}</Fade>);
        }

        return <Fade {...props} disabled>{child}</Fade>;
    });

    if (component && isValidElement(component)) {
        return cloneElement(component, { children: fadeChildren });
    }

    return <>{fadeChildren}</>;
}

interface FadeProps {
    disabled?: boolean;
    animation?: 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-up-right' | 'fade-up-left' | 'fade-down-right' | 'fade-down-left';
    duration?: number;
    offset?: number;
    delay?: number;
}

function Fade({ children, disabled, animation = 'fade-up', duration = 800, offset, delay }: { children: ReactNode } & FadeProps) {
    if (disabled) return <>{children}</>;

    return isValidElement(children) ? cloneElement(children, { 'data-aos': animation, 'data-aos-duration': duration?.toString(), 'data-aos-offset': offset?.toString(), 'data-aos-delay': delay?.toString() }) : <div data-aos={animation} data-aos-duration={duration?.toString()} data-aos-offset={offset?.toString()} data-aos-delay={delay?.toString()}>{children}</div>;
}