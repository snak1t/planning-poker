import styled from 'styled-components';
import { Card } from 'antd';

const CenterContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AuthFormWrapper = styled(Card)`
    max-width: 320px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export { CenterContent, AuthFormWrapper };
