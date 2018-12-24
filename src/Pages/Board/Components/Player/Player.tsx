import * as React from 'react';
import * as Atoms from './atoms';
import { PlayRoomContext, Player } from '../../../../Data/PlaySession/PlayRoomContext';

type Props = {
    user: Player;
};

const renderScore = (score: string | number, shouldShowScore: boolean): string => {
    if (!shouldShowScore) {
        return '?';
    }
    if (typeof score === 'number') {
        return score.toString();
    }
    return score[0];
};

export const PlayerComponent: React.SFC<Props> = ({ user }) => {
    const { isRevealing } = React.useContext(PlayRoomContext);
    const { picture, login } = user.info;
    return (
        <Atoms.UserItem>
            {typeof picture === 'number' ? (
                <Atoms.UserDefaultAvatar avatar={picture} />
            ) : (
                <Atoms.UserAvatar avatar={picture} />
            )}
            <Atoms.UserName>{login}</Atoms.UserName>
            {user.score !== null ? <Atoms.UserScore>{renderScore(user.score, isRevealing)}</Atoms.UserScore> : null}
        </Atoms.UserItem>
    );
};
