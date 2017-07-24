import React from 'react'
import '../styles.css'
import { Button } from '../../../Shared/Components/Controls'

export const GameItem = ({
  title,
  description,
  onNavigateToTask,
  _id,
  onDeleteGame
}) => {
  return (
    <article className="Games-item">
      <header className="Games-gameHeader">
        {title}
      </header>
      <div className="Games-gameDescription">
        {description}
      </div>
      <footer className="Games-gameFooter">
        <Button outline onClick={() => onNavigateToTask(_id)}>
          Play
        </Button>
        <Button outline onClick={() => onDeleteGame(_id)}>
          Delete
        </Button>
      </footer>
    </article>
  )
}
