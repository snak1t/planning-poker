import styled from 'styled-components';

const UserList = styled.ul`
    list-style-type: none;
    padding: 1rem;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
`;

const UserItem = styled.li``;
const UserAvatar = styled.div`
    width: 6.6rem;
    height: 6.6rem;
    background-image: url(${({ avatar }) => avatar});
    background-size: contain;
    border-radius: 50%;
`;

export const UserDefaultAvatar = styled.div`
    width: 6.6rem;
    height: 6.6rem;
    background-image: url(/assets/avatars.jpg);
    background-position-y: ${({ avatar }) => `-${55 + Math.floor(avatar / 6) * 130}px`};
    background-position-x: ${({ avatar }) => `-${15 + ((avatar + 6) % 6) * 95}px`};
    background-size: 600px;
`;
const UserName = styled.div`
    text-align: center;
`;

export { UserList, UserItem, UserAvatar, UserName };
