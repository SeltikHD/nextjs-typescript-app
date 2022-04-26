import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Typography } from "@mui/material";
import type { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import ReactMarkdown from "react-markdown";
import SuperLink from "@components/SuperLink";

export default function ReadMe({ ...props }: ReactMarkdownOptions) {
    return (
        <ReactMarkdown
            components={{
                code: ({ className, children }) => {
                    const language = className?.replace("language-", "");

                    return (
                        <SyntaxHighlighter style={vscDarkPlus} wrapLongLines={true} language={language}>
                            {children}
                        </SyntaxHighlighter>
                    );
                },
                a: ({ href, children }) => (
                    <SuperLink href={href} variant="inherit" target="_blank">{children}</SuperLink>
                ),
                p: ({ children }) => (
                    <Typography variant="body1" component="p" align="center" gutterBottom>{children}</Typography>
                ),
                h1: ({ children }) => (
                    <Typography variant="h2" component="h1" align="center" gutterBottom>{children}</Typography>
                ),
                h2: ({ children }) => (
                    <Typography variant="h3" component="h2" align="center" gutterBottom>{children}</Typography>
                ),
                h3: ({ children }) => (
                    <Typography variant="h5" component="h3" align="center" gutterBottom>{children}</Typography>
                )
            }}
            {...props}
        />
    );
}