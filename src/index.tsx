import React from 'react';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto';
import 'normalize.css';

import './index.css';
import App from './App';
import store from './store/store';

import {createTheme, ThemeProvider} from '@mui/material';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const theme = createTheme({
    palette: {
        primary: {main: '#067988', light: '#37939f', contrastText: '#ffffff'},
        secondary: {
            main: '#df5026',
            light: '#e57351',
            contrastText: '#fef95a',
        },
    },
});
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);
