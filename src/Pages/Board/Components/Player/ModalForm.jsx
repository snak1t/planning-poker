import React from 'react'
import {
  FormGroup,
  Label,
  Input,
  Button
} from '../../../../Shared/Components/Controls'
import { Modal } from '../../../../Shared/Components/Modal/Container'

export const TemporaryLoginForm = ({
  addUnauthorizedUser,
  history: { replace }
}) => {
  let loginInput

  const onSubmit = event => {
    event.preventDefault()
    const login = loginInput.value
    addUnauthorizedUser({ login })
  }

  return (
    <div>
      <Modal title="Please, enter your name" onClose={() => replace('/')}>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <Label htmlFor="login">Your Login</Label>
            <Input
              id="login"
              name="login"
              type="text"
              innerRef={element => (loginInput = element)}
              placeholder="Your desired login"
            />
          </FormGroup>
          <FormGroup>
            <Button primary type="submit">
              Enter room
            </Button>
          </FormGroup>
        </form>
      </Modal>
    </div>
  )
}
