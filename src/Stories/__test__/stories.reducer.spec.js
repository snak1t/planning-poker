import { stories } from '../reducer'

const defaultState = {
  all: [],
  current: null
}

describe('Stories reducer', () => {
  it('should be initialized with default state', () => {
    const action = { type: 'INIT' }
    const expected = stories(undefined, action)

    expect(expected).toEqual(defaultState)
  })

  it('should add new story to container', () => {
    const story = {
      title: 'Second',
      description: '',
      score: 0,
      active: false,
      _id: '596f6392412aa21e78754806'
    }
    const action = {
      type: '[sockets] BROADCAST_ADD_NEW_STORY',
      payload: [story]
    }

    const state = stories(defaultState, action)
    expect(state.all).toEqual([story])
  })

  it('should add all stories on update game', () => {
    const story1 = {
      title: 'First story',
      description: '',
      score: 0,
      active: false,
      _id: '596e2278b946b231a8417d12'
    }

    const story2 = {
      title: 'Second',
      description: 'werwerwer',
      score: 0,
      active: false,
      _id: '596f6392412aa21e78754806'
    }

    const action = {
      type: '[game] UPDATE_GAME',
      payload: {
        title: 'Second sprint',
        description: 'Lorem ipsum dolor',
        _id: '596e226eb946b231a8417d11',
        stories: [story1, story2]
      }
    }

    const state = stories(defaultState, action)
    expect(state.all.length).toEqual(2)
    expect(state.all).toEqual([story1, story2])
  })
  it('should replace all previos items on game update', () => {
    const story1 = {
      title: 'First story',
      description: '',
      score: 0,
      active: false,
      _id: '596e2278b946b231a8417d12'
    }

    const story2 = {
      title: 'Second',
      description: 'werwerwer',
      score: 0,
      active: false,
      _id: '596f6392412aa21e78754806'
    }

    const action = {
      type: '[game] UPDATE_GAME',
      payload: {
        title: 'Second sprint',
        description: 'Lorem ipsum dolor',
        _id: '596e226eb946b231a8417d11',
        stories: [story1]
      }
    }

    const state = stories({ all: [story2], current: null }, action)
    expect(state.all.length).toEqual(1)
    expect(state.all).toEqual([story1])
  })

  it('should update a specific story', () => {
    const story = {
      title: 'First story',
      description: '',
      score: 0,
      active: false,
      _id: '596e2278b946b231a8417d12'
    }

    const updatedStory = {
      title: 'First story1',
      description: 'updated desc',
      score: 2,
      active: false,
      _id: '596e2278b946b231a8417d12'
    }
    const action = {
      type: '[sockets] BROADCAST_UPDATE_STORY',
      payload: updatedStory
    }

    const state = stories({ all: [story], current: null }, action)

    expect(state.all.length).toEqual(1)
    expect(state.all[0]).toEqual(updatedStory)
    expect(state.all[0].title).toEqual(updatedStory.title)
  })

  it('should delete story', () => {
    const story1 = {
      title: 'First story',
      description: '',
      score: 0,
      active: false,
      _id: '596e2278b946b231a8417d12'
    }

    const story2 = {
      title: 'Second',
      description: 'werwerwer',
      score: 0,
      active: false,
      _id: '596f6392412aa21e78754806'
    }

    const action = {
      type: '[sockets] BROADCAST_DELETED_STORY',
      payload: '596f6392412aa21e78754806'
    }

    const state = stories({ all: [story1, story2], current: null }, action)

    expect(state.all.length).toEqual(1)
    expect(state.all[0]).toEqual(story1)
  })

  it('should reset current story to null, it this story was deleted', () => {
    const id = '596e2278b946b231a8417d12'
    const story1 = {
      title: 'First story',
      description: '',
      score: 0,
      active: false,
      _id: id
    }
    const action = {
      type: '[sockets] BROADCAST_DELETED_STORY',
      payload: id
    }

    const state = stories({ all: [story1], current: id }, action)

    expect(state.all.length).toEqual(0)
    expect(state.current).toEqual(null)
  })

  it('should set a current story', () => {
    const id = '596e2278b946b231a8417d12'
    const story1 = {
      title: 'First story',
      description: '',
      score: 0,
      active: false,
      _id: id
    }
    const action = {
      type: '[sockets] SET_CURRENT_STORY',
      payload: {
        story: id,
        isPlaying: false
      }
    }

    const store = stories({ all: [story1], current: null }, action)

    expect(store.current).toEqual(id)
  })
})
