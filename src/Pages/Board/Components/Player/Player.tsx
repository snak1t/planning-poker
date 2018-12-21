import * as React from 'react';
import * as Atoms from './atoms';
import { PlayRoomContext } from '../../../../Data/PlaySession/PlayRoomContext';
export type User = {
    avatar: string | number;
    user: string;
    score: string | number | null;
};

type Props = {
    user: User;
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

export const Player: React.SFC<Props> = ({ user }) => {
    const { isRevealing } = React.useContext(PlayRoomContext);
    return (
        <Atoms.UserItem>
            {typeof user.avatar === 'number' ? (
                <Atoms.UserDefaultAvatar avatar={user.avatar} />
            ) : (
                <Atoms.UserAvatar avatar={user.avatar} />
            )}
            <Atoms.UserName>{user.user}</Atoms.UserName>
            {user.score !== null ? <Atoms.UserScore>{renderScore(user.score, isRevealing)}</Atoms.UserScore> : null}
        </Atoms.UserItem>
    );
};
