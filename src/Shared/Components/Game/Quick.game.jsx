import React from 'react'
import { withRouter } from 'react-router-dom'
import compose from 'ramda/src/compose'
import replace from 'ramda/src/replace'
import concat from 'ramda/src/concat'
import split from 'ramda/src/split'
import filter from 'ramda/src/filter'
import not from 'ramda/src/not'
import isEmpty from 'ramda/src/isEmpty'
import ifElse from 'ramda/src/ifElse'
import join from 'ramda/src/join'
import length from 'ramda/src/length'
import equals from 'ramda/src/equals'
import useWith from 'ramda/src/useWith'
import identity from 'ramda/src/identity'
import invoker from 'ramda/src/invoker'

import { Input } from '../Controls/Input'
import { Button } from '../Controls/Button'

const joinWithSlash = join('/')
const splitBySlash = split('/')
const notEmpty = compose(not, isEmpty)

const extractAddress = compose(
  ifElse(
    compose(equals(3), length),
    compose(concat('/'), joinWithSlash),
    compose(concat('/game/'), joinWithSlash)
  ),
  filter(notEmpty),
  splitBySlash,
  replace(window.location.origin, '')
)

const goToGame = useWith(invoker(1, 'replace'), [extractAddress, identity])

export const QuickGame = ({ history }) => {
  let textInput = null
  return (
    <div>
      <Input
        type="text"
        ref={input => (textInput = input)}
        placeholder="Game Url"
      />
      <Button small primary onClick={() => goToGame(textInput.value, history)}>
        Go
      </Button>
    </div>
  )
}

export default withRouter(QuickGame)
