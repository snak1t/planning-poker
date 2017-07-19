import { user } from '../reducer'

describe('User reducer', () => {
  it('Should be initialized with default value', () => {
    const action = { type: 'INIT' }
    const actualState = user(undefined, action)
    const expectedState = null
    expect(expectedState).toEqual(actualState)
  })
})
