import { createTheme, responsiveFontSizes } from '@mui/material/styles';

type GetThemeProps = {
    themeName: string;
};

const baseTheme = createTheme({
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
    },
});

let darkTheme = createTheme({
    ...baseTheme,
    palette: {
        //...baseTheme.palette,
        mode: 'dark',
        primary: {
            main: '#0A66B2',
        },
    },
});

let lightTheme = createTheme({
    ...baseTheme,
    palette: {
        //...baseTheme.palette,
        mode: 'light',
    },
});

darkTheme = responsiveFontSizes(darkTheme);
lightTheme = responsiveFontSizes(lightTheme);

export default function getTheme({ themeName = 'light' }: GetThemeProps) {
    return themeName === 'dark' ? darkTheme : lightTheme;
}

export { darkTheme, lightTheme };
