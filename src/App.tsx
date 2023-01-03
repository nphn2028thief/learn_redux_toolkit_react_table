import { createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import Montserrat from './assets/Montserrat-Regular.ttf';
import DefaultLayout from './layouts/default_layout';
// import { useEffect } from 'react';
// import { useAppDispatch } from './redux_store/store';
// import { getUserInfo } from './redux_store/login/auth_actions';
import { publicRoutes } from './routes';

let theme = createTheme();
const shadows = theme.shadows;
shadows[1] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';

theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, Roboto',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Montserrat'), local('Montserrat-Regular'), url(${Montserrat}) format('truetype');
            }
          `,
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: 'red',
                },
            },
        },
    },
    // breakpoints: {
    //     values: {
    //         xs: 0,
    //         sm: 685,
    //         md: 900,
    //         lg: 1200,
    //         xl: 1600,
    //     },
    // },
    shadows,
});

function App() {
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         dispatch(getUserInfo(token));
    //     }
    // }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    body: {
                        height: '100vh',
                        width: '100%',
                        fontFamily: 'Montserrat, Roboto',
                        color: '#000000DE !important',
                    },
                    '#root': {
                        height: '100%',
                    },
                    '&::-webkit-scrollbar': {
                        borderRadius: 0,
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(25, 118, 210, 0.8)',
                        borderRadius: 2,
                    },
                }}
            />

            <Routes>
                {publicRoutes.map((publicRoute) => {
                    const Page = publicRoute.component;
                    let Layout = DefaultLayout;

                    if (publicRoute.layout) {
                        Layout = publicRoute.layout;
                    }

                    return (
                        <Route
                            key={publicRoute.id}
                            path={publicRoute.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </ThemeProvider>
    );
}

export default App;
