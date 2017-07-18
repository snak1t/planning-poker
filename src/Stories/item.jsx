import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import { Button } from '../Controls/Button';

export const Item = ({
  _id,
  title,
  score,
  description,
  setEditMode,
  deleteStory,
  playStory,
  onlyEdit,
  admin
}) => {
  return (
    <article className={styles.story}>
      <header className={styles.storyHeader}>
        <h4 className={styles.storyTitle}>
          {title} {score !== 0 ? ` - ${score} sp` : ''}
        </h4>
      </header>
      <div className={styles.storyDescription}>
        {description}
      </div>
      {admin &&
        <footer className={styles.storyFooter}>
          <Button small outline onClick={setEditMode}>
            Edit Story
          </Button>
          {onlyEdit
            ? null
            : <Button small outline onClick={() => playStory(_id)}>
                Play Story
              </Button>}
          {onlyEdit
            ? null
            : <Button small outline onClick={() => deleteStory(_id)}>
                Delete Story
              </Button>}
        </footer>}
    </article>
  );
};

Item.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  setEditMode: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  playStory: PropTypes.func.isRequired,
  onlyEdit: PropTypes.bool,
  admin: PropTypes.bool
};
