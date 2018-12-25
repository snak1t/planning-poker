import React from 'react';
import { Input, Button, Form } from 'antd';

import './styles.css';
import { useTextField } from '../../../../utils/hooks/useTextField';

export function ItemEdit({ story, onUpdateStory, onSetEditMode }) {
    const [newTitle, setTitle] = useTextField(story.title || '');
    const [newDescription, setDescription] = useTextField(story.description || '');

    const saveItem = e => {
        e.preventDefault();
        onUpdateStory({
            title: newTitle,
            description: newDescription,
        });
        onSetEditMode(false);
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
                <Button onClick={() => onSetEditMode(false)}>Cancel</Button>
                <Button htmlType="submit" type="primary">
                    Save
                </Button>
            </footer>
        </Form>
    );
}
