import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup } from '../../../Shared/Components/Controls';
import { saveGame } from '../../../Data/Games/reducer.js';
import { Modal, Input, Icon, Radio } from 'antd';

const auditIcon = <Icon type="audit" style={{ color: 'rgba(0,0,0,.25)' }} />;

const useTextField = initialValue => {
    const [value, setValue] = useState(initialValue);
    const handler = ({ target }) => setValue(target.value);
    return [value, handler];
};

export function GameForm({ saveGame, onClose }) {
    const [description, setDescription] = useTextField('');
    const [title, setTitle] = useTextField('');

    const onSubmit = () => {
        saveGame({ description, title });
        onClose();
    };
    return (
        <Modal visible={true} title="Create new game" onCancel={onClose} onOk={onSubmit}>
            <FormGroup>
                <Input
                    prefix={auditIcon}
                    id="title"
                    name="title"
                    placeholder="Game Title"
                    value={title}
                    onChange={setTitle}
                />
            </FormGroup>
            <FormGroup>
                <Input.TextArea
                    id="description"
                    name="description"
                    placeholder="Optional game description"
                    value={description}
                    onChange={setDescription}
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

GameForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    saveGame: PropTypes.func,
};

const mapDispatchToProps = {
    saveGame,
};

export default connect(
    null,
    mapDispatchToProps,
)(GameForm);
