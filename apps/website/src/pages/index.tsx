import type { InferGetStaticPropsType } from 'next/types';
import { Button, Grid, Typography } from '@mui/material';
import { getMDContent } from '@utils/utils';
import { useState } from 'react';
import FadeBox from '@components/FadeBox';
import Layout from '@components/UI/Layout';
import useStyles from '@styles/mainIndex';
import dynamic from 'next/dynamic';

const TextSnippetIcon = dynamic(() => import('@mui/icons-material/TextSnippet'), { ssr: false });
const Dialog = dynamic(() => import('@mui/material/Dialog'), { ssr: false });
const ReadMe = dynamic(() => import('@components/ReadMe'), { ssr: false });

export default function Page({ READMEData }: InferGetStaticPropsType<typeof getStaticProps>) {
    const classes = useStyles();
    const [readMeOpen, setReadMeOpen] = useState(false);

    return (
        <Layout>
            <Grid container flexDirection="column" sx={{ backgroungColor: '#000' }}>
                <FadeBox delay={1000} all>
                    <Grid item component="main" className={`fade?delay=0&translateY=30; ${classes.bgMain}`} id="main"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '70vh',
                            padding: '2em',
                        }}
                    >
                        <FadeBox delay={500} all>
                            <Typography variant="h2" component="h1" align="center" gutterBottom>
                                A basic (but very useful) template.
                            </Typography>
                            <Typography variant="h5" component="h2" align="center" paragraph>
                                This template uses Next JS, MUI v5, Prisma, TypeScript and some other very useful dependencies, as shown in the section below.
                            </Typography>
                            <Button variant="contained" startIcon={<TextSnippetIcon />} onClick={() => setReadMeOpen(true)} size="large" sx={{ backgroundColor: '#7e00fc', color: '#fff' }}>View Read Me</Button>
                            <Dialog open={readMeOpen} onClose={() => setReadMeOpen(false)}>
                                <Grid container flexDirection="column">
                                    <ReadMe className={classes.root}>{READMEData.content}</ReadMe>
                                </Grid>
                            </Dialog>
                        </FadeBox>
                    </Grid>
                </FadeBox>
            </Grid>
        </Layout>
    );
}

export async function getStaticProps() {
    const READMEData = await getMDContent('README');

    return {
        props: {
            READMEData
        }
    }
}