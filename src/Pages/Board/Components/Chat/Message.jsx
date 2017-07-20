import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`padding: 4px;`;

const UserRow = styled.span`
  display: inline-block;
  padding-right: 10px;
  font-size: 1.1em;
  color: #00796b;
  font-weight: 600;
`;

export const ChatMessage = ({ user, message }) => {
  return (
    <StyledDiv>
      <UserRow>
        {user.login}:
      </UserRow>
      <span>
        {message}
      </span>
    </StyledDiv>
  );
};

ChatMessage.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired
  }),
  message: PropTypes.string.isRequired
};
