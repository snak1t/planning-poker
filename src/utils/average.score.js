import {
  compose,
  converge,
  pluck,
  map,
  sum,
  length,
  divide,
  ifElse,
  is,
  cond,
  contains,
  always,
  groupBy,
  prop,
  isNil,
  T
} from 'ramda'

const goldenRatio = (1 + Math.sqrt(5)) / 2

const log = (a, b) => Math.log(b) / Math.log(a)

const findFiboOrdinal = value =>
  Math.round(log(goldenRatio, Math.sqrt(5) * value))

const findByOrdinal = n =>
  Math.round(
    (Math.pow(goldenRatio, n) - Math.pow(-goldenRatio, -n)) /
      (2 * goldenRatio - 1)
  )

const average = converge(divide, [sum, length])

const getRoundedAverage = compose(Math.ceil, average)

const calculateAverageForNumbers = compose(
  findByOrdinal,
  getRoundedAverage,
  map(findFiboOrdinal)
)

const extractScores = pluck('score')

const divideScoresByType = groupBy(
  ifElse(is(String), always('string'), always('number'))
)

const calculateStringAnswer = cond([
  [contains('coffee'), always('Coffee break')],
  [contains('question'), always('Unclear')],
  [contains('\u221e'), always('Infinity')],
  [T, always('Unclear')]
])

const calculationCondition = ifElse(
  compose(isNil, prop('string')),
  compose(calculateAverageForNumbers, prop('number')),
  compose(calculateStringAnswer, prop('string'))
)

export const calculateAverage = compose(
  calculationCondition,
  divideScoresByType,
  extractScores
)
