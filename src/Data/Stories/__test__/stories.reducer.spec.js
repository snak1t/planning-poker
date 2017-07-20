import { stories } from '../reducer'

const defaultState = {
  all: {},
  ids: []
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
    expect(state.all).toEqual({ [story._id]: story })
    expect(state.ids).toEqual([story._id])
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
    expect(state.ids.length).toEqual(2)
    expect(state.all).toEqual({ [story1._id]: story1, [story2._id]: story2 })
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

    const prevState = {
      all: { [story2._id]: story2 },
      ids: [story2._id]
    }

    const state = stories(prevState, action)
    expect(state.ids.length).toEqual(1)
    expect(state.all).toEqual({ [story1._id]: story1 })
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

    const prevState = {
      all: { [story._id]: story },
      ids: [story._id]
    }

    const state = stories(prevState, action)

    expect(state.ids.length).toEqual(1)
    expect(state.all[story._id]).toEqual(updatedStory)
    expect(state.all[story._id].title).toEqual(updatedStory.title)
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
    const prevState = {
      all: {
        [story1._id]: story1,
        [story2._id]: story2
      },
      ids: [story1._id, story2._id]
    }

    const state = stories(prevState, action)

    expect(state.ids.length).toEqual(1)
    expect(state.all[story2._id]).toBeUndefined()
    expect(state.all[story1._id]).toBeDefined()
    expect(state.all[story1._id]).toEqual(story1)
  })
})
