import styled from 'styled-components';

export const UserList = styled.ul`
    list-style-type: none;
    padding: 1rem;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
`;
export const UserItem = styled.li`
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;
export const UserAvatar = styled('div')<{ avatar: string }>`
    width: 6.6rem;
    height: 6.6rem;
    background-image: url(${({ avatar }) => avatar});
    background-size: contain;
    border-radius: 50%;
`;

export const UserDefaultAvatar = styled('div')<{ avatar: number }>`
    width: 6.6rem;
    height: 6.6rem;
    background-image: url(/assets/avatars.jpg);
    background-position-y: ${({ avatar }) => `-${55 + Math.floor(avatar / 6) * 130}px`};
    background-position-x: ${({ avatar }) => `-${15 + ((avatar + 6) % 6) * 95}px`};
    background-size: 600px;
`;
export const UserName = styled.div`
    text-align: center;
`;

export const UserScore = styled.div`
    position: absolute;
    left: calc(50% + 2rem);
    top: 0.5rem;
    width: 2rem;
    height: 2rem;
    background-color: #52c41a;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;
