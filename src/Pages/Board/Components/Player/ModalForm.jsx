import React, { useContext } from 'react';
import { Modal, Input } from 'antd';
import { FormGroup } from '../../../../Shared/Components/Controls';
import { useTextField } from '../../../../utils/hooks/useTextField';
import { AuthContext, LOG_STATUS } from '../../../../Data/Auth/AuthContext';

export const TemporaryLoginForm = ({ history: { replace } }) => {
    const [login, setLogin] = useTextField('');
    const { setUser } = useContext(AuthContext);

    const onSubmit = event => {
        event.preventDefault();
        setUser({
            login,
            logStatus: LOG_STATUS.LOGGED_IN,
        });
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
