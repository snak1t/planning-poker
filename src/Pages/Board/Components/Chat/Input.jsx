import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Button, Input } from 'antd';
import { InputGroup } from './atoms';
import { useTextField } from '../../../../utils/hooks/useTextField';

export function ChatInputArea({ onSendMessage }) {
    const [value, setValue] = useTextField('');

    const handleSubmit = () => {
        if (value === '') return;
        onSendMessage(value);
        setValue();
    };

    const handleKeyDown = event => {
        if (event.charCode === 13) {
            return handleSubmit();
        }
    };

    return (
        <React.Fragment>
            <Divider />
            <InputGroup>
                <Input name="chat" onKeyPress={handleKeyDown} value={value} onChange={setValue} />
                <Button
                    type="primary"
                    shape="circle"
                    icon="enter"
                    onClick={handleSubmit}
                    style={{ flexShrink: 0, marginLeft: '0.6rem' }}
                />
            </InputGroup>
        </React.Fragment>
    );
}

ChatInputArea.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
};
