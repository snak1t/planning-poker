import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  compose,
  replace,
  concat,
  split,
  filter,
  not,
  isEmpty,
  ifElse,
  join,
  length,
  equals,
  useWith,
  identity,
  invoker
} from 'ramda';
import { Input } from '../Controls/input';
import { Button } from '../Controls/Button';

const joinWithSlash = join('/');
const splitBySlash = split('/');
const notEmpty = compose(not, isEmpty);

const extractAddress = compose(
  ifElse(
    compose(equals(3), length),
    compose(concat('/'), joinWithSlash),
    compose(concat('/game/'), joinWithSlash)
  ),
  filter(notEmpty),
  splitBySlash,
  replace(window.location.origin, '')
);

const goToGame = useWith(invoker(1, 'replace'), [extractAddress, identity]);

export const QuickGame = ({ history }) => {
  let textInput = null;
  return (
    <div>
      <Input
        type="text"
        ref={input => textInput = input}
        placeholder="Game Url"
      />
      <Button small primary onClick={() => goToGame(textInput.value, history)}>
        Go
      </Button>
    </div>
  );
};

export default withRouter(QuickGame);
