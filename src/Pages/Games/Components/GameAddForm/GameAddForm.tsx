import React, { useContext } from 'react';
import { Modal, Input, Icon, Radio, Form, message } from 'antd';
import { useTextField } from '../../../../utils/hooks/useTextField';
import { GamesContext } from '../../../../Data/Games/GamesContext';

const auditIcon = <Icon type="audit" style={{ color: 'rgba(0,0,0,.25)' }} />;

type Props = {
    onClose: () => void;
};
export const GameAddForm: React.SFC<Props> = ({ onClose }) => {
    const [description, setDescription] = useTextField('');
    const [title, setTitle] = useTextField('');
    const { addGame } = useContext(GamesContext);
    const onSubmit = () => {
        if (title === '') {
            return message.info('Each game should have a title');
        }
        addGame({ description, title });
        onClose();
    };
    return (
        <Modal visible={true} title="Create new game" onCancel={onClose} onOk={onSubmit}>
            <Form.Item>
                <Input
                    prefix={auditIcon}
                    id="title"
                    name="title"
                    placeholder="Game Title"
                    data-testid="game-title-input"
                    value={title}
                    onChange={setTitle}
                />
            </Form.Item>
            <Form.Item>
                <Input.TextArea
                    id="description"
                    name="description"
                    placeholder="Optional game description"
                    data-testid="game-description-input"
                    value={description}
                    onChange={setDescription}
                />
            </Form.Item>
            <Form.Item>
                <Radio.Group defaultValue="fibonacci" buttonStyle="solid">
                    <Radio.Button value="fibonacci">Fibonacci</Radio.Button>
                    <Radio.Button value="sizes">Sizes</Radio.Button>
                </Radio.Group>
            </Form.Item>
        </Modal>
    );
};
