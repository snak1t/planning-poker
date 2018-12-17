import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { Card, Divider, Button, Icon } from 'antd';

export const CurrentStory = ({ title, score, description, onResetCurrent, children }) => {
    return (
        <Card>
            <header className="Stories-storyHeader" style={{ position: 'relative' }}>
                <h4 className="Stories-storyTitle">
                    {title} {score !== 0 ? ` - ${score} sp` : ''}
                </h4>
                <Button onClick={onResetCurrent}>
                    <Icon type="close-circle" theme="twoTone" />
                </Button>
            </header>
            <div className="Stories-storyDescription">{description}</div>
            <Divider />
            {children}
        </Card>
    );
};

CurrentStory.propTypes = {
    title: PropTypes.string.isRequired,
    score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    onResetCurrent: PropTypes.func.isRequired,
};
