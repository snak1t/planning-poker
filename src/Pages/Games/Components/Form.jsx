import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Icon, Radio } from 'antd';
import { FormGroup } from '../../../Shared/Components/Controls';
import { useTextField } from '../../../utils/hooks/useTextField';
import { GamesContext } from '../../../Data/Games/GamesContext';

const auditIcon = <Icon type="audit" style={{ color: 'rgba(0,0,0,.25)' }} />;

export function GameForm({ onClose }) {
    const [description, setDescription] = useTextField('');
    const [title, setTitle] = useTextField('');
    const { addGame } = useContext(GamesContext);
    const onSubmit = () => {
        addGame({ description, title });
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
};
