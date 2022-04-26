import type { Session } from 'next-auth';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { userAvatar } from '@utils/avatar';
import { useState } from 'react';
import Layout from '@components/Layout';
import dynamic from 'next/dynamic';
import useStyles from '@styles/backgrounds';

const FadeBox = dynamic(() => import('@components/FadeBox'), { ssr: false });
const EditIcon = dynamic(() => import('@mui/icons-material/Edit'), { ssr: false });

export default function Account() {
    const classes = useStyles();
    const [session, setSession] = useState<Session | null>(null);
    const [edit, setEdit] = useState(false);

    return (
        <Layout auth={{ blockUnauthorized: true, setSession: (s) => setSession(s) }}>
            <Grid container flexDirection="row">
                <Grid
                    item
                    component="main"
                    className={classes.bgMain}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    flexWrap="wrap"
                    padding="2em"
                    display="flex"
                    xs={12}
                    lg={8}
                >
                    <FadeBox all>
                        {session?.user?.image ? <Avatar {...userAvatar({ name: session?.user?.name, icon: session?.user?.image, width: 256, height: 256 })} /> : null}
                        <Typography component='h1' variant='h3' mt={3} noWrap>{session?.user.name}</Typography>
                    </FadeBox>
                </Grid>
                <Grid
                    item
                    component="main"
                    className={classes.bgPrimary}
                    display={edit ? 'none' : 'block'}
                    xs={12}
                    lg={4}
                >
                    <Box
                        maxWidth="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        flexWrap="wrap"
                        padding="2em"
                    >
                        <FadeBox all>
                            {session?.user?.image ? <Avatar {...userAvatar({ name: session?.user?.name, icon: session?.user?.image, width: 256, height: 256 })} /> : null}
                            <Typography component='h1' variant='h3' mt={3} noWrap>{session?.user.name}</Typography>
                            {session?.user.username ? <Typography component='h1' variant='h5' noWrap>@{session?.user.username}</Typography> : null}
                            {session?.user.email ? <Typography component='h1' variant='h4' mt={3} noWrap sx={{ color: '#A0A3A2' }}>{session?.user.email}</Typography> : null}
                            {session?.user.role && session?.user.role != 'USER' ? <Typography component='h1' variant='h4' mt={3} noWrap sx={{ color: '#FFF56D' }}>{session?.user.role?.charAt(0).toUpperCase() + session?.user.role?.slice(1).toLowerCase()}</Typography> : null}
                            <Button
                                variant="contained"
                                endIcon={<EditIcon />}
                                size="large"
                                sx={{ color: '#fff', transition: 'all 1s', alignSelf: 'center', mt: 5 }}
                                onClick={() => setEdit(true)}
                            >
                                Edit Profile
                            </Button>
                        </FadeBox>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
}