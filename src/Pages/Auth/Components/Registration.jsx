import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form as FForm } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Icon, Button } from 'antd';

import { registerUser } from '../../../Data/Auth/actions.js';
import { getFormItemAttributes } from './helpers.js';

const mapDispatchToProps = {
    doRegistration: registerUser,
};

const registrationSchema = Yup.object().shape({
    login: Yup.string()
        .required('Login is required')
        .test('is-login-taken', 'Login has already been taken', login =>
            axios
                .post('/api/login/check', { login })
                .then(response => response.data)
                .then(data => !data.exist),
        ),
    password: Yup.string().required('Password is required'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirm is required'),
});

export const RegistrationComponent = ({ doRegistration }) => (
    <Formik
        initialValues={{
            login: '',
            password: '',
            passwordConfirm: '',
        }}
        validationSchema={registrationSchema}
        onSubmit={values => {
            doRegistration({
                login: values.login,
                password: values.password,
            });
        }}
    >
        {props => {
            const { values, errors, initialValues, isValid, handleChange } = props;
            return (
                <FForm>
                    <Form.Item {...getFormItemAttributes(values, errors, initialValues, 'login')}>
                        <Input
                            name="login"
                            onChange={handleChange}
                            value={values.login}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item {...getFormItemAttributes(values, errors, initialValues, 'password')}>
                        <Input
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Password"
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item {...getFormItemAttributes(values, errors, initialValues, 'passwordConfirm')}>
                        <Input
                            name="passwordConfirm"
                            onChange={handleChange}
                            value={values.passwordConfirm}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Password"
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={!isValid}>
                            Sign up
                        </Button>
                    </Form.Item>
                </FForm>
            );
        }}
    </Formik>
);

export default withRouter(
    connect(
        null,
        mapDispatchToProps,
    )(RegistrationComponent),
);
