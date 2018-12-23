import * as React from 'react';

import * as Atoms from './atoms';
import { Score } from './deck';

type Props = {
    value: Score;
    cardPicked: boolean;
    onClick: (value: Score) => void;
};

export const Card: React.SFC<Props> = ({ value, onClick = () => {}, cardPicked }) => {
    const displayedValue: string | JSX.Element =
        typeof value === 'string' ? (
            /^\w/.test(value) ? (
                <span className={`fa fa-${value}`} />
            ) : (
                value
            )
        ) : (
            value.toString()
        );
    return (
        <Atoms.CardContainer onClick={() => onClick(value)} cardPicked={cardPicked}>
            <Atoms.CardInnerContainer>
                <Atoms.CardTopLeftCaption>{displayedValue}</Atoms.CardTopLeftCaption>
                <Atoms.CardCenterCaption>
                    <span>{displayedValue}</span>
                </Atoms.CardCenterCaption>
                <Atoms.CardBottomRightCaption>{displayedValue}</Atoms.CardBottomRightCaption>
            </Atoms.CardInnerContainer>
        </Atoms.CardContainer>
    );
};
