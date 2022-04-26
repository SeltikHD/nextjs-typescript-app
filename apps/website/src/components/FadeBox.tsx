import type { ReactNode } from 'react';
import Fade from '@components/Fade';
import { Children, isValidElement, useState, useRef } from 'react';
import { useLocalStorage } from 'react-use';

type Props = {
    children: ReactNode;
    delay?: number;
    all?: boolean;
};

const fadePropsDefault = [
    'component',
    'sx',
    'yOffset',
    'delay',
    'vanishingTransition',
    'appearingTransition',
    'translateY'
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
}

export default function FadeBox({ children, delay = 0, all }: Props) {
    const [fadeI, setFadeI] = useState(0);
    const [animations] = useLocalStorage<boolean>('animations') ?? true;
    const active = useRef(animations);

    const fadeChildren = Children.map(children, (child: ReactNode, i) => {
        if (isValidElement(child) && ((child.props?.className?.includes("fade") || all) && !child.props?.className?.includes("skip")) && active.current) {
            const className: string = child.props.className;
            const customProps = className ? extractFadeProps(className, fadePropsDefault) : {};

            return (<Fade delay={delay} {...customProps} fading={fadeI == i} afterDelay={() => setFadeI(i + 1)}>{child}</Fade>);
        }

        return <Fade delay={delay} fading={fadeI == i} afterDelay={() => setFadeI(i + 1)} disabled>{child}</Fade>;
    });

    return <>{fadeChildren}</>;
}