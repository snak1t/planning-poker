import React from 'react';
import { Route } from 'react-router-dom';
import { Tabs } from 'antd';

import LoginComponent from './Components/Login';
import RegistrationComponent from './Components/Registration';
import { CenterContent, AuthFormWrapper } from './atoms';

export class AuthContainer extends React.Component {
    state = {
        activeKey: 'sign-in',
    };

    onChange = activeKey => this.setState({ activeKey });

    componentDidUpdate(prevProps, prevState) {
        if (prevState.activeKey !== this.state.activeKey) {
            this.props.history.push(`/auth/${this.state.activeKey}`);
        }
    }

    render() {
        const {
            match: { url },
        } = this.props;
        return (
            <CenterContent>
                <AuthFormWrapper>
                    <Tabs activeKey={this.state.activeKey} onChange={this.onChange} animated={false}>
                        <Tabs.TabPane tab="Sign in" key="sign-in">
                            <Route path={`${url}/sign-in`} component={LoginComponent} />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Sign up" key="sign-up">
                            <Route path={`${url}/sign-up`} component={RegistrationComponent} />
                        </Tabs.TabPane>
                    </Tabs>
                </AuthFormWrapper>
            </CenterContent>
        );
    }
}
