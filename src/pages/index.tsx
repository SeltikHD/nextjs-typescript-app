import { Button, CircularProgress, Grid, Theme, Typography } from '@mui/material';
import Layout from 'components/Layout';
import { InferGetStaticPropsType } from 'next';
import { getMDContent } from 'utils/utils';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { grey } from '@mui/material/colors';
import dynamic from 'next/dynamic';

const ReactMarkdown = dynamic(() => import('react-markdown'), { loading: () => <CircularProgress disableShrink />, ssr: false });
const SyntaxHighlighter = dynamic(() => import('../components/Lazy/SyntaxHighlighter'), { loading: () => <CircularProgress disableShrink />, ssr: false });
const TextSnippetIcon = dynamic(() => import('@mui/icons-material/TextSnippet'), { ssr: false });
const SuperLink = dynamic(() => import('../components/SuperLink'), { ssr: false });
const FadeBox = dynamic(() => import('../components/FadeBox'), { ssr: false });
const Dialog = dynamic(() => import('../components/Dialog'), { ssr: false });

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2)
    },
    bgPrimary: {
        backgroundColor: theme.palette.mode === 'dark' ? '#1C1E1F' : grey[500],
        color: theme.palette.mode === 'dark' ? grey[50] : grey[900]
    },
    bgSecondary: {
        backgroundColor: theme.palette.mode === 'dark' ? grey[500] : '#1C1E1F',
        color: theme.palette.mode === 'dark' ? grey[900] : grey[50]
    }
}));

export default function Page({ READMEData }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [readMeOpen, setReadMeOpen] = useState(false);
    const classes = useStyles();

    return (
        <Layout>
            <Grid container flexDirection="column">
                <FadeBox>
                    <Grid item component="main" className={`${classes.bgPrimary} fade`} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2em' }}>
                        <Typography variant="h2" component="h1" align="center" gutterBottom>
                            A basic (but very useful) template.
                        </Typography>
                        <Typography variant="h5" component="h2" align="center" paragraph>
                            This template uses Next JS, MUI v5, Prisma, TypeScript and some other very useful dependencies, as shown in the section below.
                        </Typography>
                        <Button variant="contained" startIcon={<TextSnippetIcon />} onClick={() => setReadMeOpen(true)} size="large" sx={{ backgroundColor: '#7e00fc', color: '#fff' }}>View Read Me</Button>
                        <Dialog open={readMeOpen} onClose={() => setReadMeOpen(false)}>
                            <Grid container flexDirection="column">
                                <ReactMarkdown
                                    components={{
                                        code: ({ className, children }) => {
                                            const language = className?.replace("language-", "");

                                            return (
                                                <SyntaxHighlighter language={language}>
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
                                    className={classes.root}
                                >
                                    {READMEData.content}
                                </ReactMarkdown>
                            </Grid>
                        </Dialog>
                    </Grid>
                </FadeBox>
            </Grid>
        </Layout>
    );
}

export async function getStaticProps() {
    const READMEData = await getMDContent('README.md');

    return {
        props: {
            READMEData
        }
    }
}