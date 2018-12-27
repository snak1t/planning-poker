import { compose, replace, concat, split, filter, not, isEmpty, ifElse, join, length, equals } from 'ramda';

const joinWithSlash: (xs: ReadonlyArray<string>) => string = join('/');
const splitBySlash = split('/');
const notEmpty = compose(
    not,
    isEmpty,
);

export const extractAddress: (value: string) => string = compose(
    ifElse(
        compose(
            equals(3),
            length,
        ),
        compose(
            concat('/'),
            joinWithSlash,
        ),
        compose(
            concat('/game/'),
            joinWithSlash,
        ),
    ),
    filter(notEmpty),
    splitBySlash,
    replace(window.location.origin, ''),
);
