import type { Session } from 'next-auth';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { userAvatar } from '@utils/avatar';
import { useState } from 'react';
import Layout from '@components/UI/Layout';
import dynamic from 'next/dynamic';
import useStyles from '@styles/backgrounds';
import SuperLink from '@components/SuperLink';

const FadeBox = dynamic(() => import('@components/FadeBox'), { ssr: false });

export default function Account() {
    const classes = useStyles();
    const [session, setSession] = useState<Session | null>(null);

    return (
        <Layout auth={{ blockUnauthenticated: true, allowAnonymous: true }} setSession={s => setSession(s)}>
            <Grid container flexDirection="row">
                <Grid item component="main" className={classes.bgPrimary} xs={12}>
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
                            {session?.user?.image && (
                                <Avatar
                                    {...userAvatar({
                                        name: session?.user?.name,
                                        icon: session?.user?.image,
                                        width: 256,
                                        height: 256,
                                    })}
                                />
                            )}
                            <Typography component="h1" variant="h3" mt={3} noWrap>
                                {session?.user.name}
                            </Typography>
                            {session?.user.username && (
                                <Typography component="h1" variant="h5" noWrap>
                                    @{session?.user.username}
                                </Typography>
                            )}
                            {session?.user.email && (
                                <Typography component="h1" variant="h4" mt={3} noWrap sx={{ color: '#A0A3A2' }}>
                                    {session?.user.email}
                                </Typography>
                            )}
                            {session?.user.role &&
                                session.user.role != null &&
                                (session.user.role.name == 'Admin' ? (
                                    <SuperLink variant="h4" color="#FFF56D" href="/admin">
                                        <Typography component="h1" variant="h4" mt={3} noWrap>
                                            Admin
                                        </Typography>
                                    </SuperLink>
                                ) : (
                                    <Typography component="h1" variant="h4" mt={3} noWrap>
                                        {session.user.role.name.charAt(0).toUpperCase() +
                                            session?.user.role.name.slice(1).toLowerCase()}
                                    </Typography>
                                ))}
                        </FadeBox>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
}
