import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import compose from 'ramda/src/compose';
import replace from 'ramda/src/replace';
import concat from 'ramda/src/concat';
import split from 'ramda/src/split';
import filter from 'ramda/src/filter';
import not from 'ramda/src/not';
import isEmpty from 'ramda/src/isEmpty';
import ifElse from 'ramda/src/ifElse';
import join from 'ramda/src/join';
import length from 'ramda/src/length';
import equals from 'ramda/src/equals';

import { Input, Button, message } from 'antd';
import { useTextField } from '../../utils/hooks/useTextField';

const joinWithSlash = join('/');
const splitBySlash = split('/');
const notEmpty = compose(
    not,
    isEmpty,
);

const extractAddress = compose(
    ifElse(
        compose(
            equals(3),
            length,
        ),
        compose(
            concat('/'),
            joinWithSlash,
        ),
        compose(
            concat('/game/'),
            joinWithSlash,
        ),
    ),
    filter(notEmpty),
    splitBySlash,
    replace(window.location.origin, ''),
);

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
