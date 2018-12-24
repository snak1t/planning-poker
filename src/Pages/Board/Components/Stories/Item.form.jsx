import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Form } from 'antd';

import './styles.css';
import { useTextField } from '../../../../utils/hooks/useTextField';
import { storyType } from '../../../../Data/Stories/type';

export function ItemEdit({ story, onUpdateStory, setEditMode }) {
    const [newTitle, setTitle] = useTextField(story.title || '');
    const [newDescription, setDescription] = useTextField(story.description || '');

    const saveItem = e => {
        e.preventDefault();
        onUpdateStory({
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
    story: storyType,
    setEditMode: PropTypes.func.isRequired,
    onUpdateStory: PropTypes.func.isRequired,
};
