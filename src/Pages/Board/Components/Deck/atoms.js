import styled from 'styled-components';

const CardListWrapper = styled.section`
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    border: 1px solid #ebedf0;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    padding: 1rem;
`;

const Container = styled.div`
    border: 1px solid #e8e8e8
    max-width: 9rem;
    flex: 1 0 9rem;
    box-sizing: border-box;
    margin: 0 0.2rem !important;
    padding: 1.5rem;
    box-shadow: ${({ cardPicked }) => (cardPicked ? '0px 4px 12px rgba(25, 88, 203, 0.27)' : '')};
    transform: translateY(${({ cardPicked }) => (cardPicked ? '-2rem' : 0)});
    cursor: pointer;
    background-color: ${props => (props.back ? '#e0e0e0' : 'white')};
`;

const Left = styled.div`
    font-size: 1.3rem;
    line-height: 2rem;
    display: ${props => (props.back ? 'none' : 'initial')};
`;

const Right = styled.div`
    text-align: right;
    line-height: 2rem;
    font-size: 1.3rem;
    display: ${props => (props.back ? 'none' : 'initial')};
`;

const Center = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    & > span:first-child {
        display: ${props => (props.back ? 'none' : 'initial')};
    }
    & span.fa {
        font-size: 1.4rem;
    }
    & > span.userName {
        font-size: 1.1rem;
    }
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CardListScollable = styled.div`
    display: flex;
    width: 100%;
    overflow-x: auto;
`;

const Card = {
    Container,
    Left,
    Right,
    Center,
    InnerContainer,
};

export { CardListWrapper, Card, CardListScollable };
