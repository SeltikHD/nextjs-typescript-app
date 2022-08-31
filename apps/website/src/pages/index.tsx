import type { InferGetStaticPropsType } from 'next/types';
import { useContext, useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { getMDContent } from '@utils/utils';
import LayoutContext from '@contexts/LayoutContext';
import useStyles from '@styles/mainIndex';
import dynamic from 'next/dynamic';

const TextSnippetIcon = dynamic(() => import('@mui/icons-material/TextSnippet'), { ssr: false });
const Dialog = dynamic(() => import('@mui/material/Dialog'), { ssr: false });
const ReadMe = dynamic(() => import('@components/ReadMe'), { ssr: false });

export default function Page({ READMEData }: InferGetStaticPropsType<typeof getStaticProps>) {
    const classes = useStyles();
    const [readMeOpen, setReadMeOpen] = useState(false);

    const { setProps } = useContext(LayoutContext);

    useEffect(() => {
        setProps({ auth: { blockUnauthenticated: false }, overflowY: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container flexDirection="column" sx={{ backgroungColor: '#000' }}>
            <Grid
                item
                component="main"
                className={classes.bgMain}
                id="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '70vh',
                    padding: '2em',
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    align="center"
                    gutterBottom
                    data-aos="fade-up"
                    data-aos-duration="500"
                >
                    A basic (but very useful) template.
                </Typography>
                <Typography
                    variant="h5"
                    component="h2"
                    align="center"
                    paragraph
                    data-aos="fade-up"
                    data-aos-duration="500"
                >
                    This template uses Next JS, MUI v5, Prisma, TypeScript and some other very useful dependencies, as
                    shown in the section below.
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<TextSnippetIcon />}
                    onClick={() => setReadMeOpen(true)}
                    size="large"
                    sx={{ backgroundColor: '#7e00fc', color: '#fff', transition: 'all 1s', mt: 5 }}
                    data-aos="fade-up"
                    data-aos-duration="1200"
                >
                    View Read Me
                </Button>
                <Dialog open={readMeOpen} onClose={() => setReadMeOpen(false)}>
                    <Grid container flexDirection="column">
                        <ReadMe className={classes.root}>{READMEData.content}</ReadMe>
                    </Grid>
                </Dialog>
            </Grid>
        </Grid>
    );
}

export async function getStaticProps() {
    const READMEData = await getMDContent('README');

    return {
        props: {
            READMEData,
        },
    };
}
