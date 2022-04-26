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
    className?: string;
};

export default function SuperLink({
    children,
    target = '_self',
    href = '/',
    text = '',
    variant = 'inherit',
    underline = 'none',
    color = '#39CCCC',
    onClick,
    className
}: Props) {
    return (
        <NextLink href={href} passHref>
            <MUILink variant={variant} underline={underline} color={color} onClick={onClick} target={target} className={className}>
                {text}
                {children}
            </MUILink>
        </NextLink>
    );
}
