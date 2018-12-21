import styled from 'styled-components';

const UserList = styled.ul`
    list-style-type: none;
    padding: 0;
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
const UserName = styled.div`
    text-align: center;
`;

export { UserList, UserItem, UserAvatar, UserName };
