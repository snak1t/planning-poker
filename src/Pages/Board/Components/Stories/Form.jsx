import React from 'react';
import PropTypes from 'prop-types';
import split from 'ramda/src/split';
import map from 'ramda/src/map';
import { Button, Input } from 'antd';
import { FormWrapper } from './atoms';

export class StoriesForm extends React.Component {
    state = {
        value: '',
    };

    static propTypes = {
        mode: PropTypes.bool.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        toggleMode: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    };

    handleChange = ({ target }) => this.setState({ value: target.value });
    handleToggleMode = () => this.props.toggleMode(this.props.mode);

    handleKeyPress = ({ charCode }) => {
        if (charCode !== 13) {
            return;
        }
        const allTasks = map(item => ({ title: item }), split('\n', this.state.value));
        this.props.handleSubmit(allTasks);
        this.props.toggleMode(this.props.mode);
        this.setState({ value: '' });
    };

    render() {
        const { isAdmin, mode } = this.props;
        if (!isAdmin) {
            return null;
        }
        return (
            <FormWrapper>
                {mode ? (
                    <Input.TextArea
                        placeholder="Story title"
                        value={this.state.value}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleChange}
                    />
                ) : (
                    <Button onClick={this.handleToggleMode}>Add new Story</Button>
                )}
            </FormWrapper>
        );
    }
}
