import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import { Input, Button, Form } from 'antd';

export class ItemEdit extends React.Component {
    state = {
        title: '',
        description: '',
    };

    componentDidMount() {
        this.setState({
            title: this.props.title || '',
            description: this.props.description || '',
        });
    }

    handleTitleChange = ({ target }) => this.setState({ title: target.value });

    handleDescriptionChange = ({ target }) => this.setState({ description: target.value });

    saveItem = e => {
        e.preventDefault();
        this.props.updateStory({
            _id: this.props._id,
            ...this.state,
        });
        this.props.setEditMode();
    };

    render() {
        const { setEditMode } = this.props;
        return (
            <Form onSubmit={this.saveItem}>
                <header className="Stories-storyHeader">
                    <Input
                        placeholder="title of the story"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                </header>
                <div className="Stories-storyDescription">
                    <Input.TextArea
                        placeholder="Descripition"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                    />
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
}

ItemEdit.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    setEditMode: PropTypes.func.isRequired,
    updateStory: PropTypes.func.isRequired,
};
