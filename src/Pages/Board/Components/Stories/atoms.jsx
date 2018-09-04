import styled from 'styled-components';
import { Card } from 'antd';

const Wrapper = styled(Card)`
    width: 340px;
`;

const ScollableContent = styled.div`
    max-height: ${props => props.limit || '100%'};
    overflow: auto;
`;

export { Wrapper, ScollableContent };
