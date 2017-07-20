import playSession, { isGameCompleted } from '../reducer'

const defaultState = {
  scores: [],
  isPlaying: false,
  isRevealing: false,
  currentStory: ''
}

describe('PlaySession reducer', () => {
  it('Should be initialized with default state', () => {
    const expectedState = defaultState
    const actualState = playSession(undefined, {})
    expect(expectedState).toEqual(actualState)
  })

  it('should update players on syncing players', () => {
    const action = {
      type: '[players] SYNC_PLAYER',
      payload: [
        {
          login: 'snak',
          score: null
        },
        {
          login: 'john',
          score: 22
        }
      ]
    }
    const expectedState = {
      scores: [{ user: 'snak', score: null }, { user: 'john', score: 22 }],
      isPlaying: true,
      isRevealing: false,
      currentStory: '123'
    }
    const initialState = {
      scores: [{ user: 'snak', score: 123 }],
      isPlaying: true,
      isRevealing: false,
      currentStory: '123'
    }
    const actualState = playSession(initialState, action)
    expect(expectedState).toEqual(actualState)
  })

  it('should set isPlaying to payload, and isRevealing to false in all cases', () => {
    const action1 = {
      type: '[sockets] BROADCAST_READY_TO_PLAY',
      payload: true
    }
    const action2 = {
      type: '[sockets] BROADCAST_READY_TO_PLAY',
      payload: false
    }
    const initialState = {
      scores: [{ user: 'snak', score: 123 }],
      isPlaying: false,
      isRevealing: true,
      currentStory: '123'
    }
    const state = playSession(initialState, action1)
    expect(state.isPlaying).toEqual(true)
    expect(state.isRevealing).toEqual(false)
    const state1 = playSession(state, action2)
    expect(state1.isPlaying).toEqual(false)
    expect(state1.isRevealing).toEqual(false)
  })

  it('on revealing cards, it should set isRevealing to true, and isPlaying to false', () => {
    const action1 = {
      type: '[sockets] BROADCAST_SHOW_PLAYED_CARDS'
    }
    const initialState = {
      scores: [{ user: 'snak', score: 123 }],
      isPlaying: true,
      isRevealing: false,
      currentStory: '123'
    }
    const state = playSession(initialState, action1)
    expect(state.isPlaying).toEqual(false)
    expect(state.isRevealing).toEqual(true)
  })

  it('on resetting bids, isPlaying must be set to true, and isRevealing to false, all scores must be set to null', () => {
    const action = {
      type: '[sockets] BROADCAST_RESET_BIDS'
    }
    const initialState = {
      scores: [{ user: 'snak', score: 123 }, { user: 'john', score: 456 }],
      isPlaying: false,
      isRevealing: true,
      currentStory: '123'
    }
    const state = playSession(initialState, action)
    expect(state.isPlaying).toEqual(true)
    expect(state.isRevealing).toEqual(false)
    state.scores.forEach(function(element) {
      expect(element.score).toEqual(null)
    })
  })
  it('on settings currentStory all scores must be set to null, isRevealing and isPlaying to false', () => {
    const action = {
      type: '[sockets] SET_CURRENT_STORY',
      payload: {
        story: '456',
        isPlaying: false
      }
    }
    const initialState = {
      scores: [{ user: 'snak', score: 123 }, { user: 'john', score: 456 }],
      isPlaying: true,
      isRevealing: true,
      currentStory: '123'
    }
    const state = playSession(initialState, action)
    expect(state.isPlaying).toEqual(false)
    expect(state.isRevealing).toEqual(false)
    state.scores.forEach(function(element) {
      expect(element.score).toEqual(null)
    })
  })
})

describe('PlaySession selectors', () => {
  it('isGamePlayed selector must return false or true', () => {
    const store = {
      playSession: {
        scores: [{ user: 'snak', score: 123 }, { user: 'john', score: null }]
      }
    }
    expect(isGameCompleted(store)).toEqual(false)
    store.playSession.scores[1].score = 1
    expect(isGameCompleted(store)).toEqual(true)
  })
})
