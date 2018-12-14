import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Tabs } from 'antd';

import LoginComponent from './Components/Login';
import RegistrationComponent from './Components/Registration';
import { CenterContent, AuthFormWrapper } from './atoms';

export function AuthContainer({ history, match }) {
    const [activeKey, setActiveKey] = useState('sign-in');

    useEffect(
        () => {
            history.push(`/auth/${activeKey}`);
        },
        [activeKey],
    );
    return (
        <CenterContent>
            <AuthFormWrapper>
                <Tabs activeKey={activeKey} onChange={setActiveKey} animated={false}>
                    <Tabs.TabPane tab="Sign in" key="sign-in">
                        <Route path={`${match.url}/sign-in`} component={LoginComponent} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Sign up" key="sign-up">
                        <Route path={`${match.url}/sign-up`} component={RegistrationComponent} />
                    </Tabs.TabPane>
                </Tabs>
            </AuthFormWrapper>
        </CenterContent>
    );
}
