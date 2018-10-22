import React from 'react';
import '../styles.css';
import { Icon } from 'antd';
import Card from 'antd/es/card';

export const GameItem = ({ title, description, onNavigateToTask, _id, onDeleteGame }) => {
    return (
        <Card
            style={{ margin: '0.4rem' }}
            title={title}
            actions={[
                <Icon type="play-circle" onClick={() => onNavigateToTask(_id)} />,
                <Icon type="delete" onClick={() => onDeleteGame(_id)} />,
            ]}
        >
            {description}
        </Card>
        // <article className="Games-item">
        //   <footer className="Games-gameFooter">
        //     <Button outline onClick={() => onNavigateToTask(_id)}>
        //       Play
        //     </Button>
        //     <Button outline onClick={() => onDeleteGame(_id)}>
        //       Delete
        //     </Button>
        //   </footer>
        // </article>
    );
};
