import Fade from './Fade';
import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';

type Props = {
    children: ReactNode;
};

export default function FadeBox({ children }: Props) {
    const fadeChildren = Children.map(children, (child: ReactNode) => {
        if (isValidElement(child) && child.props.className.match("fade") == "fade") {
            return (<Fade>{child}</Fade>);
        }

        return child;
    });

    return (
        <>
            {fadeChildren}
        </>
    );
}
