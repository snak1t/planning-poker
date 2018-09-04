import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose as composeHOC } from 'recompose';
import { Form, Input, Icon, Button } from 'antd';

import { registerUser } from '../../../Data/Auth/actions.js';
import { withValidation } from 'rehoc-validator';
import { registrationValidationConfig } from './validators.config';
import { showErrorsForRegistrationComponent } from './helpers';

const mapDispatchToProps = {
    doRegistration: registerUser,
};

const enhancer = composeHOC(
    withRouter,
    connect(
        null,
        mapDispatchToProps,
    ),
    withValidation(registrationValidationConfig),
);

export const RegistrationComponent = ({ login, password, passwordConfirm, valid, doRegistration }) => {
    const performRegistration = e => {
        e.preventDefault();
        doRegistration({
            login: login.value,
            password: password.value,
        });
    };
    return (
        <Form onSubmit={performRegistration}>
            {showErrorsForRegistrationComponent(login, password, passwordConfirm)}
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
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password Confirmation"
                    id="passwordConfirm"
                    value={passwordConfirm.value}
                    onChange={passwordConfirm.handler}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={!valid}>
                    Sign up
                </Button>
            </Form.Item>
        </Form>
    );
};

export default enhancer(RegistrationComponent);
