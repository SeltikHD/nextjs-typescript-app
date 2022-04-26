import type { ReactNode } from 'react';
import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props extends Prism {
    children: ReactNode;
    language: string | undefined;
}

export default function SyntaxHighlighter({ children, ...props }: Props) {
    return (
        <Prism style={vscDarkPlus} wrapLongLines={true} {...props}>
            {children}
        </Prism>
    );
}