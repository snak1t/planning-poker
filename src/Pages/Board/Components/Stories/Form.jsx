import React from 'react';
import PropTypes from 'prop-types';
import split from 'ramda/src/split';
import map from 'ramda/src/map';
import { Button, Input } from 'antd';
import { FormWrapper } from './atoms';
import { useTextField } from '../../../../utils/hooks/useTextField';

export function StoriesForm({ mode, toggleMode, isAdmin, handleSubmit }) {
    const [value, setValue] = useTextField('');

    const handleToggleMode = () => toggleMode(mode);

    const handleKeyPress = ({ charCode }) => {
        if (charCode !== 13) {
            return;
        }
        const allTasks = map(item => ({ title: item }), split('\n', value));
        handleSubmit(allTasks);
        toggleMode(mode);
        setValue();
    };

    if (!isAdmin) {
        return null;
    }
    return (
        <FormWrapper>
            {mode ? (
                <Input.TextArea
                    placeholder="Story title"
                    value={value}
                    onKeyPress={handleKeyPress}
                    onChange={setValue}
                />
            ) : (
                <Button onClick={handleToggleMode}>Add new Story</Button>
            )}
        </FormWrapper>
    );
}

StoriesForm.propTypes = {
    mode: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    toggleMode: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};
