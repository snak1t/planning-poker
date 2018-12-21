import React, { useContext, useState } from 'react';
import { Modal, Input, Form, Switch, Icon } from 'antd';
import { useTextField } from '../../../../utils/hooks/useTextField';
import { AuthContext } from '../../../../Data/Auth/AuthContext';

export const TemporaryLoginForm = ({ history: { replace } }) => {
    const [login, setLogin] = useTextField('');
    const [gender, setGender] = useState('male');
    const { setTempUser } = useContext(AuthContext);

    const onSubmit = event => {
        event.preventDefault();
        setTempUser(login, gender);
    };
    const handleChange = switchValue => setGender(switchValue ? 'female' : 'male');
    return (
        <div>
            <Modal visible={true} title="Sit a game in progress" onCancel={() => replace('/')} onOk={onSubmit}>
                <Form.Item label="Login" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                    <Input id="login" name="login" placeholder="Your desired login" value={login} onChange={setLogin} />
                </Form.Item>
                <Form.Item label="Gender" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                    <Switch
                        checked={gender === 'female'}
                        onChange={handleChange}
                        checkedChildren={<Icon type="woman" />}
                        unCheckedChildren={<Icon type="man" />}
                    />
                </Form.Item>
            </Modal>
        </div>
    );
};
