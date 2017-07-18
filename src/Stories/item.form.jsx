import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export const ItemEdit = ({
  _id,
  title,
  description,
  setEditMode,
  updateItem
}) => {
  let titleInput = null;
  let descriptionInput = null;

  const saveItem = () => {
    const data = {
      _id,
      title: titleInput.value,
      description: descriptionInput.value
    };
    updateItem(data);
    setEditMode();
  };

  return (
    <article>
      <header className={styles.storyHeader}>
        <input
          type="text"
          defaultValue={title}
          ref={input => (titleInput = input)}
        />
      </header>
      <div className={styles.storyDescription}>
        <textarea
          defaultValue={description}
          ref={input => (descriptionInput = input)}
        />
      </div>
      <footer className={styles.storyFooter}>
        <button onClick={setEditMode}>Cancel</button>
        <button onClick={() => saveItem()}>Save</button>
      </footer>
    </article>
  );
};

ItemEdit.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  setEditMode: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired
};
