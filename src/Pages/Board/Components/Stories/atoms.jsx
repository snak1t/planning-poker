import styled from 'styled-components';
import { Card } from 'antd';

const Wrapper = styled(Card)`
    width: 340px;
`;

const Panel = styled.div`
    display: flex;
    flex-direction: column;
`;

const FormWrapper = styled.div`
    margin: 1rem 0;
`;

export { Wrapper, Panel, FormWrapper };
