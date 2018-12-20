import React, { useContext } from 'react';
import { Modal, Input, Form } from 'antd';
import { useTextField } from '../../../../utils/hooks/useTextField';
import { AuthContext } from '../../../../Data/Auth/AuthContext';

export const TemporaryLoginForm = ({ history: { replace } }) => {
    const [login, setLogin] = useTextField('');
    const { setTempUser } = useContext(AuthContext);

    const onSubmit = event => {
        event.preventDefault();
        setTempUser(login);
    };

    return (
        <div>
            <Modal visible={true} title="Sit a game in progress" onCancel={() => replace('/')} onOk={onSubmit}>
                <Form.Item>
                    <Input id="login" name="login" placeholder="Your desired login" value={login} onChange={setLogin} />
                </Form.Item>
            </Modal>
        </div>
    );
};
