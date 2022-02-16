import { Button, CircularProgress, Grid, Theme, Typography } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Layout from 'components/Layout';
import { InferGetStaticPropsType } from 'next';
import { getMDContent } from 'utils/utils';
import { lazy, Suspense, useState } from 'react';
import Dialog from 'components/Dialog';
import { makeStyles } from '@mui/styles';
import { grey } from '@mui/material/colors';
import FadeBox from 'components/FadeBox';
import SuperLink from 'components/SuperLink';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const ReactMarkdown = lazy(() => import('react-markdown'));
const SyntaxHighlighter = lazy(() => import('../components/Lazy/SyntaxHighlighter'));

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
                                <Suspense fallback={<CircularProgress disableShrink />}>
                                    <ReactMarkdown
                                        components={{
                                            code: ({ className, children }) => {
                                                const language = className?.replace("language-", "");

                                                return (
                                                    <SyntaxHighlighter language={language} style={vscDarkPlus} wrapLongLines={true}>
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
                                </Suspense>
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