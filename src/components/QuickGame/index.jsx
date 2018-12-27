import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Input, Button, message } from 'antd';
import { useTextField } from '../../utils/hooks/useTextField';
import { extractAddress } from './extract-address';

const QuickGameInput = styled.section`
    width: 300px;
    margin-right: 10px;
    margin-left: auto;
    display: flex;
`;

export const QuickGame = withRouter(function QuickGame({ history }) {
    const [value, handler] = useTextField('');
    const goToGame = (string, history) => {
        if (string === '') {
            message.info('Please insert value in text field');
            return handler();
        }
        const newUrlAddress = extractAddress(string);
        history.push(newUrlAddress);
    };
    return (
        <QuickGameInput>
            <Input type="text" value={value} onChange={handler} placeholder="Game Url" />
            <Button onClick={() => goToGame(value, history)}>Go</Button>
        </QuickGameInput>
    );
});
