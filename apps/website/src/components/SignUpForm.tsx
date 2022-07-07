import { Button, TextField, Theme, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import dynamic from 'next/dynamic';
import api from '@services/api';

const GoogleIcon = dynamic(() => import('@mui/icons-material/Google'));
const FacebookIcon = dynamic(() => import('@mui/icons-material/Facebook'));
const TwitterIcon = dynamic(() => import('@mui/icons-material/Twitter'));
const GitHubIcon = dynamic(() => import('@mui/icons-material/GitHub'));
const EmailIcon = dynamic(() => import('@mui/icons-material/Email'));
const LockIcon = dynamic(() => import('@mui/icons-material/Lock'));

type Props = {
    onClose?: () => void | undefined;
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        overflow: 'hidden',

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '20vw',
            [theme.breakpoints.down('sm')]: {
                width: '60vw',
            },
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
    providerButton: {
        [theme.breakpoints.up('sm')]: {
            width: '20vw',
        },
        [theme.breakpoints.down('sm')]: {
            width: '60vw',
        },
    },
}));

function EmailForm({ onClose }: Props) {
    const classes = useStyles();
    const { control, handleSubmit } = useForm();

    const onSubmit = handleSubmit(data => {
        signIn('email', { redirect: false, email: data.email });
        if (onClose) {
            onClose();
        }
    });

    return (
        <form className={classes.root} onSubmit={onSubmit}>
            <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Email necessário',
                    pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                        message: 'Invalid Email',
                    },
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Email"
                        variant="filled"
                        type="email"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )}
            />
            <div>
                <Button variant="contained" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained">
                    Login
                </Button>
            </div>
        </form>
    );
}

interface Provider {
    id: string;
    name: string;
    type?: string;
    signinUrl?: string;
    callbackUrl?: string;
}

interface ProvidersResponse {
    email: Provider;
    auth0: Provider;
    facebook: Provider;
    github: Provider;
    google: Provider;
    twitter: Provider;
}

export default function SignUpForm({ onClose }: Props) {
    const classes = useStyles();

    const [providers, setProviders] = useState<Provider[]>([]);
    const [emailForm, setEmailForm] = useState(false);

    useEffect(() => {
        const getProviders = async () => {
            const res = await api.get<ProvidersResponse>('/auth/providers/').then(response => response.data);

            type Key = keyof typeof res;

            const keys = Object.keys(res);

            setProviders(
                keys.map(p => {
                    const provider = p as Key;

                    return res[provider];
                }),
            );
        };

        getProviders();
    }, []);

    return (
        <>
            {emailForm ? (
                <EmailForm onClose={onClose ? onClose : () => setEmailForm(false)} />
            ) : (
                <Box className={classes.root}>
                    {providers.map(provider => (
                        <Button
                            className={classes.providerButton}
                            variant="contained"
                            startIcon={getProviderIcon(provider.id)}
                            onClick={() => signIn(provider.id)}
                            key={provider.name}
                        >
                            {provider.name}
                        </Button>
                    ))}
                    {providers.includes({
                        id: 'email',
                        name: 'Email',
                    }) && (
                        <Button
                            className={classes.providerButton}
                            variant="contained"
                            startIcon={getProviderIcon('email')}
                            onClick={() => {
                                setEmailForm(true);
                            }}
                        >
                            Email
                        </Button>
                    )}
                </Box>
            )}
        </>
    );
}

function getProviderIcon(icon: string) {
    switch (icon) {
        case 'google':
            return <GoogleIcon />;
        case 'facebook':
            return <FacebookIcon />;
        case 'twitter':
            return <TwitterIcon />;
        case 'github':
            return <GitHubIcon />;
        case 'email':
            return <EmailIcon />;
        default:
            return <LockIcon />;
    }
}
