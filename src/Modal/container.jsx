import React from 'react';
import styled from 'styled-components';
import { when, propEq } from 'ramda';

const Shadow = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, .4);
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  z-index: 100;
`;

const ModalWindow = styled.div`
  width: 100%;
  max-width: 800px;
  min-width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 101;
`;

const ModalTitle = styled.div`
  width: 100%;
  line-height: 2em;
  font-size: 1.3em;
  border-bottom: 1px solid #aaa;
  margin-bottom: 0.3em;
`;

const ModalButtons = styled.div`
  width: 100%;
  line-height: 2em;
  font-size: 1.3em;
  border-top: 1px solid #aaa;
  margin-top: 0.3em;
`;

const ModalClose = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
  font-size: 2em;
  transform: rotate(45deg);
`;

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.onEscape = this.onEscape.bind(this);
  }

  componentWillMount() {
    window.addEventListener('keydown', this.onEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  }

  onEscape = when(propEq('keyCode', 27), this.props.onClose);

  render() {
    return (
      <div>
        <Shadow />
        <ModalWindow>
          <ModalClose onClick={() => this.props.onClose()}>+</ModalClose>
          <ModalTitle>
            {this.props.title}
          </ModalTitle>
          <div>
            {this.props.children}
          </div>
        </ModalWindow>
      </div>
    );
  }
}
