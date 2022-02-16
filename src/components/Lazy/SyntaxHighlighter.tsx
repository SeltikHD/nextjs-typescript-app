import { ReactNode } from 'react';
import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Props = {
    children: ReactNode;
    language: string | undefined;
}

export default function SyntaxHighlighter({ children, language }: Props) {
    return (
        <Prism language={language} style={vscDarkPlus} wrapLongLines={true}>
            {children}
        </Prism>
    );
}