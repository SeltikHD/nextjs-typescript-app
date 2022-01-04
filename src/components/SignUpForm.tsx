import { Button, TextField, Theme, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

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

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40vw',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
    providerButton: {
        width: '20vw'
    }
}));

function EmailForm({ onClose }: Props) {
    const classes = useStyles();
    const { control, handleSubmit } = useForm();

    const onSubmit = handleSubmit((data) => {
        signIn("email", { redirect: false, email: data.email });
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
                rules={{ required: 'Email necessário', pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, message: 'Por favor, coloque um email válido' } }}
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
                    Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Entrar
                </Button>
            </div>
        </form>
    );
}

export default function SignUpForm({ onClose }: Props) {
    const classes = useStyles();
    const providers = [
        [
            "google", //ID
            "Google", //Provider Name
        ]
    ];

    const loginOptions = (
        <Box className={classes.root}>
            {providers.map((provider) => (
                <Button className={classes.providerButton} variant="contained" startIcon={getProviderIcon(provider[0])} onClick={() => signIn(provider[0])} key={provider[1]}>{provider[1]}</Button>
            ))}
            <Button className={classes.providerButton} variant="contained" startIcon={getProviderIcon("email")} onClick={() => { handleEmailForm(true) }}>Email</Button>
        </Box>
    );

    const [form, setForm] = useState(loginOptions);

    const handleEmailForm = (open: boolean) => {
        if (open) {
            const emailOnClose = () => {
                handleEmailForm(false);
            };
            setForm(<EmailForm onClose={onClose ? onClose : emailOnClose} />);
        } else {
            setForm(loginOptions);
        }
    }

    return (form);
}

function getProviderIcon(icon: string) {
    switch (icon) {
        case "google":
            return <GoogleIcon />;
        case "facebook":
            return <FacebookIcon />
        case "twitter":
            return <TwitterIcon />
        case "github":
            return <GitHubIcon />
        case "email":
            return <EmailIcon />
        default:
            return <LockIcon />
    }
}