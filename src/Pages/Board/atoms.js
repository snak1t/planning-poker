import styled from 'styled-components';
export const GridWrapper = styled.section`
    display: grid;
    padding: 1rem;
    width: 100%;
    height: 100%;
    grid-gap: 2rem;
    grid-template-columns: 20rem 1fr;
    grid-template-rows: 2rem;
`;

export const GridHeader = styled.header`
    grid-column: 1 / span 2;
`;

export const GridStories = styled.section`
    grid-row: 2 / span 2;
`;

export const GridPlayers = styled.section`
    grid-row: 2 / span 1;
`;

export const GridDeck = styled.section`
    grid-row: 3 / span 1;
`;
