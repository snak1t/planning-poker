import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import { Item } from '../src/Pages/Board/Components/Stories/Item'
import { StoriesContainer } from '../src/Pages/Board/Components/Stories/Container'

const module = storiesOf('Story Item', module)

const story = {
  _id: '1',
  title: 'First Story',
  score: 0,
  description: 'My Frist Story',
  setEditMode: () => {},
  deleteStory: () => {},
  playStory: () => {}
}

module.add('Unplayed Item for admin', () => {
  return (
    <div style={{ width: '320px' }}>
      <Item {...story} onlyEdit={false} />
    </div>
  )
})

module.add('Unplayed Item for others', () => {
  return (
    <div style={{ width: '320px' }}>
      <Item {...story} onlyEdit={true} />
    </div>
  )
})

const playedStory = Object.assign({}, story, { score: 11 })

module.add('Already played Item for admin', () => {
  return (
    <div style={{ width: '320px' }}>
      <Item {...playedStory} onlyEdit={false} />
    </div>
  )
})
