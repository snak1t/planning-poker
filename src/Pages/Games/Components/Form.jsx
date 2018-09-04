import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup } from '../../../Shared/Components/Controls';
import { saveGame } from '../../../Data/Games/reducer.js';
import { Modal, Input, Icon, Radio } from 'antd';

const auditIcon = <Icon type="audit" style={{ color: 'rgba(0,0,0,.25)' }} />;

export class GameForm extends React.Component {
    state = {
        description: '',
        title: '',
    };

    static propTypes = {
        onClose: PropTypes.func.isRequired,
        saveGame: PropTypes.func,
    };

    handleDescriptionChange = ({ target }) =>
        this.setState({ description: target.value });

    handleTitleChange = ({ target }) => this.setState({ title: target.value });

    onSubmit = () => {
        this.props.saveGame(this.state);
        this.props.onClose();
    };

    render() {
        return (
            <Modal
                visible={true}
                title="Create new game"
                onCancel={this.props.onClose}
                onOk={this.onSubmit}
            >
                <FormGroup>
                    <Input
                        prefix={auditIcon}
                        id="title"
                        name="title"
                        placeholder="Game Title"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Input.TextArea
                        id="description"
                        name="description"
                        placeholder="Optional game description"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Radio.Group defaultValue="fibonaci" buttonStyle="solid">
                        <Radio.Button value="fibonaci">Fibbonacci</Radio.Button>
                        <Radio.Button value="sizes">Sizes</Radio.Button>
                    </Radio.Group>
                </FormGroup>
            </Modal>
        );
    }
}

const mapDispatchToProps = {
    saveGame,
};

export default connect(
    null,
    mapDispatchToProps
)(GameForm);
