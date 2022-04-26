import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';

const basePallete = createTheme({
    palette: {
        primary: {
            main: '#0A66B2',
        },
        secondary: {
            main: '#39CCCC',
        },
    },
});

const baseTheme = createTheme({
    ...basePallete,
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: '#6b6b6b #2b2b2b',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: '#2b2b2b',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: '#6b6b6b',
                        minHeight: 24,
                        border: '3px solid #2b2b2b',
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: '#2b2b2b',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    textTransform: 'none',
                    border: 'none',
                    backgroundColor: basePallete.palette.primary.light,
                    color: '#fff',
                    borderRadius: 4,
                    '&:hover': {
                        color: basePallete.palette.primary.light,
                        backgroundColor: alpha(basePallete.palette.primary.main, 0.16),
                    },
                    '&:active': {
                        backgroundColor: basePallete.palette.primary.dark,
                        color: '#fff',
                    },
                },
            },
        },
    },
});

let darkTheme = createTheme({
    ...baseTheme,
    palette: {
        mode: 'dark',
    },
    components: {
        ...baseTheme.components,
        MuiButton: {
            ...baseTheme.components?.MuiButton,
            styleOverrides: {
                ...baseTheme.components?.MuiButton?.styleOverrides,
                contained: {
                    ...baseTheme.components?.MuiButton?.styleOverrides?.contained as Record<string, unknown>,
                    '&:hover': {
                        backgroundColor: alpha(basePallete.palette.primary.main, 1),
                    },
                },
            },
        },
    }
});

let lightTheme = createTheme({
    ...baseTheme,
    palette: {
        mode: 'light',
    },
});

darkTheme = responsiveFontSizes(darkTheme);
lightTheme = responsiveFontSizes(lightTheme);

export default function getTheme(themeName: string) {
    return themeName === 'dark' ? darkTheme : lightTheme;
}

export { darkTheme, lightTheme };
