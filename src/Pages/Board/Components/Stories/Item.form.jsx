import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Form } from 'antd';

import './styles.css';
import { useTextField } from '../../../../utils/hooks/useTextField';

export function ItemEdit({ title, description, id, updateStory, setEditMode }) {
    const [newTitle, setTitle] = useTextField(title || '');
    const [newDescription, setDescription] = useTextField(description || '');

    const saveItem = e => {
        e.preventDefault();
        updateStory({
            id,
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
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                <Button htmlType="submit" type="primary">
                    Save
                </Button>
            </footer>
        </Form>
    );
}

ItemEdit.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    setEditMode: PropTypes.func.isRequired,
    updateStory: PropTypes.func.isRequired,
};
