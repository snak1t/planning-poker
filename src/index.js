import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { AuthProvider } from './Data/Auth/AuthContext';

render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById('root'),
);
