import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose as composeHOC } from 'recompose';

import { loginUser } from '../../../Data/Auth/actions.js';
import { withValidation } from 'rehoc-validator';
import { loginValidationConfig } from './validators.config';
import { showErrorsForLoginComponent } from './helpers';
import { Form, Input, Icon, Button } from 'antd';

const mapDispatchToProps = {
    doLogin: loginUser,
};

const enhancer = composeHOC(
    connect(
        null,
        mapDispatchToProps,
    ),
    withRouter,
    withValidation(loginValidationConfig),
);

export const LoginComponent = ({ doLogin, login, password, valid }) => {
    const performLogin = e => {
        e.preventDefault();
        doLogin({
            login: login.value,
            password: password.value,
        });
    };
    return (
        <Form onSubmit={performLogin}>
            {showErrorsForLoginComponent(login, password)}
            <Form.Item>
                <Input
                    id="login"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    value={login.value}
                    onChange={login.handler}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password.value}
                    onChange={password.handler}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={!valid}>
                    Sign in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default enhancer(LoginComponent);
