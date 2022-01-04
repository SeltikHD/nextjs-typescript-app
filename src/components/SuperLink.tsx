import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';

type Props = {
    children?: React.ReactNode;
    target?: string;
    href?: string;
    text?: string;
    variant?:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'caption'
        | 'button'
        | 'overline'
        | 'inherit';
    underline?: 'none' | 'hover' | 'always';
    color?: string;
    onClick?: () => void;
};

export default function SuperLink({
    children,
    target = '_self',
    href = '/',
    text = '',
    variant = 'body2',
    underline = 'none',
    color = '#4682b4',
    onClick,
}: Props) {
    return (
        <NextLink href={href} passHref>
            <MUILink variant={variant} underline={underline} color={color} onClick={onClick} target={target}>
                {text}
                {children}
            </MUILink>
        </NextLink>
    );
}
