import React, { useContext } from 'react';
import { CenterContent, AuthFormWrapper } from './atoms';
import { Button } from 'antd';
import { AuthContext } from '../../Data/Auth/AuthContext';

export function AuthContainer() {
    const { login } = useContext(AuthContext);
    return (
        <CenterContent>
            <AuthFormWrapper>
                <Button type="primary" onClick={login}>
                    Sign in
                </Button>
            </AuthFormWrapper>
        </CenterContent>
    );
}
