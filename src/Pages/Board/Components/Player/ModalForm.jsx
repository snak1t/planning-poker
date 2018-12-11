import React from 'react';
import { Modal, Input } from 'antd';
import { FormGroup } from '../../../../Shared/Components/Controls';
import { useTextField } from '../../../../utils/hooks/useTextField';

export const TemporaryLoginForm = ({ addUnauthorizedUser, history: { replace } }) => {
    const [login, setLogin] = useTextField('');

    const onSubmit = event => {
        event.preventDefault();
        addUnauthorizedUser({ login });
    };

    return (
        <div>
            <Modal visible={true} title="Sit a game in progress" onCancel={() => replace('/')} onOk={onSubmit}>
                <FormGroup>
                    <Input id="login" name="login" placeholder="Your desired login" value={login} onChange={setLogin} />
                </FormGroup>
            </Modal>
        </div>
    );
};
