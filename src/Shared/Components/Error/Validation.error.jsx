import React from 'react'
import styled from 'styled-components'

const ErrorsContainer = styled.div`
  position: absolute;
  left: 110%;
  width: 300px;
  background-color: #e57373;
  box-sizing: border-box;
  padding: 20px;
  color: #fafafa;
  box-shadow: 4px 2px 4px 0px rgba(0, 0, 0, 0.2);
  &::before {
    width: 0;
    height: 0;
    content: "";
    top: 50%;
    position: absolute;
    left: -40px;
    transform: translateY(-50%);
    border-left: 20px solid transparent;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #e57373;
  }
`

const ErrorTitle = styled.h2`
  margin: 1rem 0;
  padding: 0;
  font-size: 1.4rem;
  text-align: right;
`

const ErrorMsg = styled.div`text-align: left;`

const ValidationErrorsBlock = ({ title, messages }) =>
  messages.length === 0
    ? null
    : <div>
        <ErrorTitle>
          {title}
        </ErrorTitle>
        <div>
          {messages.map((msg, index) =>
            <ErrorMsg key={index}>
              {msg}
            </ErrorMsg>
          )}
        </div>
      </div>

export const ValidationErrors = ({ errors }) =>
  <ErrorsContainer>
    {errors.map((errorGroup, index) =>
      <ValidationErrorsBlock key={index} {...errorGroup} />
    )}
  </ErrorsContainer>
