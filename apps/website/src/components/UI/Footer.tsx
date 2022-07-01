import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SuperLink from '@components/SuperLink';

export function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Cagepa © '}
            <SuperLink href="https://www.cagepa.pb.gov.br/">cagepa.pb.gov.br</SuperLink>
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
                <Copyright />
            </Container>
        </Box>
    );
}
