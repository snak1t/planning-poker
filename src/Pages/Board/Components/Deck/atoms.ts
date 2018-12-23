import styled from 'styled-components';

type CardProps = { cardPicked: boolean };

export const CardListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 0.6rem;
    background-color: #fff;
    padding: 0.6rem;
`;

export const CardContainer = styled('div')<CardProps>`
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    margin: 0 0.2rem !important;
    padding-top: 125%;
    box-shadow: ${({ cardPicked }) => (cardPicked ? '0px 4px 12px rgba(25, 88, 203, 0.27)' : '')};
    transform: translateY(${({ cardPicked }) => (cardPicked ? '-2rem' : 0)});
    cursor: pointer;
    background-color: #fff;
    position: relative;
`;

export const CardTopLeftCaption = styled.div`
    font-size: 1.3rem;
    line-height: 2rem;
`;

export const CardBottomRightCaption = styled.div`
    text-align: right;
    line-height: 2rem;
    font-size: 1.3rem;
`;

export const CardCenterCaption = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    & span.fa {
        font-size: 1rem;
    }
    & > span.userName {
        font-size: 1rem;
    }
`;

export const CardInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0.6rem 1rem;
`;
