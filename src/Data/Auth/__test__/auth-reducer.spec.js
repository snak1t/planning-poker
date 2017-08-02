import { user } from '../reducer'

describe('User reducer', () => {
  it('Should be initialized with default value', () => {
    const action = { type: 'INIT' }
    const actualState = user(undefined, action)
    const expectedState = { login: '', logStatus: 'NOT_ASKED' }
    expect(expectedState).toEqual(actualState)
  })
})
