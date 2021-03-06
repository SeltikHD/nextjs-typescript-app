import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SuperLink from '@components/SuperLink';
import { grey } from '@mui/material/colors';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'SeltikHD © '}
            <SuperLink href="https://github.com/SeltikHD/nextjs-typescript-app">Template repository</SuperLink>
            {' - '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function MainFooter() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: theme => (theme.palette.mode === 'dark' ? '#373B3E' : grey[200]),
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1" align="center">
                    This is a website template with React, Next JS, MUI, NextAuth and some other dependencies,{' '}
                    <SuperLink href="https://github.com/SeltikHD/nextjs-typescript-app/blob/master/README.md">
                        take a look at the README.
                    </SuperLink>
                </Typography>
                <Copyright />
            </Container>
        </Box>
    );
}
