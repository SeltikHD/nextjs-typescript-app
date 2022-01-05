import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SuperLink from './SuperLink';
import { grey } from '@mui/material/colors';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'SeltikHD © '}
            <SuperLink href="https://github.com/SeltikHD/nextjs-typescript-app">
                Template repository
            </SuperLink>{' - '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#373B3E' : grey[200]
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1">
                    This is a website template with React, Next JS, MUI, NextAuth and some other dependencies, <SuperLink href="https://github.com/SeltikHD/nextjs-typescript-app/blob/next-auth_material-ui/README.md">take a look at the README</SuperLink>.
                </Typography>
                <Copyright />
            </Container>
        </Box>
    );
}