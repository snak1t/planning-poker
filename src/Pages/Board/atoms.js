import styled from 'styled-components';
export const GridWrapper = styled.section`
    display: grid;
    height: 100%;
    grid-gap: 2rem;
    grid-template-columns: 20rem 1fr;
    grid-template-rows: 4rem 1fr 1fr;
`;

export const GridHeader = styled.header`
    grid-column: 1 / span 2;
`;

export const GridStories = styled.section`
    grid-row: 2 / span 2;
`;

export const GridPlayers = styled.section``;

export const GridDeck = styled.section``;
