import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import { Input, Button, Form } from 'antd';
import { useTextField } from '../../../../utils/hooks/useTextField';

export function ItemEdit({ title, description, _id, updateStory, setEditMode }) {
    const [newTitle, setTitle] = useTextField(title || '');
    const [newDescription, setDescription] = useTextField(description || '');

    const saveItem = e => {
        e.preventDefault();
        updateStory({
            _id,
            title: newTitle,
            description: newDescription,
        });
        setEditMode();
    };

    return (
        <Form onSubmit={saveItem}>
            <header className="Stories-storyHeader">
                <Input placeholder="title of the story" value={newTitle} onChange={setTitle} />
            </header>
            <div className="Stories-storyDescription">
                <Input.TextArea placeholder="Description" value={newDescription} onChange={setDescription} />
            </div>
            <footer className="Stories-storyFooter">
                <Button onClick={setEditMode}>Cancel</Button>
                <Button htmlType="submit" type="primary">
                    Save
                </Button>
            </footer>
        </Form>
    );
}

ItemEdit.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    setEditMode: PropTypes.func.isRequired,
    updateStory: PropTypes.func.isRequired,
};
