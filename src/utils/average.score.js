import compose from 'ramda/src/compose';
import converge from 'ramda/src/converge';
import map from 'ramda/src/map';
import pluck from 'ramda/src/pluck';
import sum from 'ramda/src/sum';
import length from 'ramda/src/length';
import divide from 'ramda/src/divide';
import ifElse from 'ramda/src/ifElse';
import is from 'ramda/src/is';
import cond from 'ramda/src/cond';
import contains from 'ramda/src/contains';
import always from 'ramda/src/always';
import groupBy from 'ramda/src/groupBy';
import prop from 'ramda/src/prop';
import isNil from 'ramda/src/isNil';
import T from 'ramda/src/T';

const goldenRatio = (1 + Math.sqrt(5)) / 2;

const log = (a, b) => Math.log(b) / Math.log(a);

const findFibonacciOrdinal = value => Math.round(log(goldenRatio, Math.sqrt(5) * value));

const findByOrdinal = n => Math.round((Math.pow(goldenRatio, n) - Math.pow(-goldenRatio, -n)) / (2 * goldenRatio - 1));

const average = converge(divide, [sum, length]);

const getRoundedAverage = compose(
    Math.ceil,
    average,
);

const calculateAverageForNumbers = compose(
    findByOrdinal,
    getRoundedAverage,
    map(findFibonacciOrdinal),
);

const extractScores = pluck('score');

const divideScoresByType = groupBy(ifElse(is(String), always('string'), always('number')));

const calculateStringAnswer = cond([
    [contains('coffee'), always('Coffee break')],
    [contains('question'), always('Unclear')],
    [contains('\u221e'), always('Infinity')],
    [T, always('Unclear')],
]);

const calculationCondition = ifElse(
    compose(
        isNil,
        prop('string'),
    ),
    compose(
        calculateAverageForNumbers,
        prop('number'),
    ),
    compose(
        calculateStringAnswer,
        prop('string'),
    ),
);

export const calculateAverage = compose(
    calculationCondition,
    divideScoresByType,
    extractScores,
);
