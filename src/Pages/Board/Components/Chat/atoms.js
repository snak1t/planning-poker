import styled from 'styled-components';
import { Badge } from 'antd';

export const InputGroup = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ChatButton = styled(Badge)`
    position: fixed !important;
    right: 2rem;
    bottom: 2rem;
`;
