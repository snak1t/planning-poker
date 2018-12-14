import styled from 'styled-components';

export const GamesHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 1rem;
    h1 {
        font-size: 1.2rem;
        line-height: 1.4rem;
    }
`;

export const GamesGrid = styled.section`
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
    min-height: 0;
    min-width: 0;
    @media screen and (max-width: 400px) {
        padding: 0.2rem;
        grid-template-columns: 1fr;
    }
`;

export const GameGridItem = styled.article`
    min-width: 0;
`;
