import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

import { store } from './Data/store';
import { AuthProvider } from './Data/Auth/AuthContext';

render(
    <Provider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Provider>,
    document.getElementById('root'),
);
