import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Button, Input } from 'antd';
import { InputGroup } from './atoms';

export class ChatInputArea extends React.Component {
    state = {
        value: '',
    };
    handleChange = ({ target }) => this.setState({ value: target.value });
    handleSubmit = () => {
        if (this.state.value === '') return;
        this.props.onSendMessage(this.state.value);
        this.setState({ value: '' });
    };
    handleKeyDown = event => {
        if (event.charCode === 13) {
            return this.handleSubmit(this.state.value);
        }
    };
    render() {
        return (
            <React.Fragment>
                <Divider />
                <InputGroup>
                    <Input
                        name="chat"
                        onKeyPress={this.handleKeyDown}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon="enter"
                        onClick={this.handleSubmit}
                        style={{ flexShrink: 0, marginLeft: '0.6rem' }}
                    />
                </InputGroup>
            </React.Fragment>
        );
    }
}

ChatInputArea.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
};
