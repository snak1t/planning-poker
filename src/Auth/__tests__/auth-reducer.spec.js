import { user } from '../reducer'

describe('User reducer', () => {
  it('Should be initialized with default value', () => {
    const action = { type: 'INIT' }
    const actualState = user(undefined, action)
    const expectedState = 1
    expect(expectedState).toEqual(actualState)
  })
})
