import React from 'react';
import styles from './styles.css';
import { OutlineButton } from '../Controls/outlineButton';
import { Button } from '../Controls/Button';
import { connect } from 'react-redux';

export const GameItem = (
  { title, description, onNavigateToTask, _id, onDeleteGame }
) => {
  return (
    <article className={styles.item}>
      <header className={styles.gameHeader}>
        {title}
      </header>
      <div className={styles.gameDescription}>
        {description}
      </div>
      <footer className={styles.gameFooter}>
        <Button outline onClick={() => onNavigateToTask(_id)}>
          Play
        </Button>
        <Button outline onClick={() => onDeleteGame(_id)}>
          Delete
        </Button>
      </footer>
    </article>
  );
};
