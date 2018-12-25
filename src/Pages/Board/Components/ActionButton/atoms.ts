import styled from 'styled-components';

export const FloatContainer = styled('div')`
    position: fixed !important;
    right: 2rem;
    bottom: 2rem;
    display: flex;
    flex-direction: column;

    & > * {
        margin: 0.5rem 0rem !important;
    }
`;
