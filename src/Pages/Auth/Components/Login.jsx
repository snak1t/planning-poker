import React, { useContext } from 'react';
import { Formik, Form as FForm } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Icon, Button } from 'antd';

import { getFormItemAttributes } from './helpers';
import { AuthContext } from '../../../Data/Auth/AuthContext';

const loginSchema = Yup.object().shape({
    login: Yup.string().min(3, 'User login is too short'),
    password: Yup.string().min(3, 'Password must be longer than 4 symbols'),
});

export default function LoginComponent() {
    const { signIn } = useContext(AuthContext);
    return (
        <Formik initialValues={{ login: '', password: '' }} onSubmit={signIn} validationSchema={loginSchema}>
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
                                type="password"
                                onChange={handleChange}
                                value={values.password}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={!isValid}>
                                Sign in
                            </Button>
                        </Form.Item>
                    </FForm>
                );
            }}
        </Formik>
    );
}
