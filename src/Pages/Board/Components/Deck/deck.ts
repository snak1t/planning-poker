type StringScore = 'coffee' | 'question' | '\u221e';
export type Score = number | StringScore | null;

export type DeckCard = {
    value: Score;
};

export const DECK: DeckCard[] = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 5 },
    { value: 8 },
    { value: 13 },
    { value: 21 },
    { value: 34 },
    { value: 55 },
    { value: 89 },
    { value: 'question' },
    { value: '\u221e' },
    { value: 'coffee' },
];

const StringScoreMap = {
    coffee: 100,
    question: 200,
    '\u221e': 300,
};

const numberComparator = (a: number, b: number): 1 | -1 | 0 => {
    return Math.max(Math.min(1, a - b), -1) as 1 | -1 | 0;
};

export const comparator = (a: Score, b: Score): 1 | -1 | 0 => {
    if (a === null) {
        return -1;
    }
    if (b === null) {
        return 1;
    }
    const aValue = typeof a === 'number' ? a : StringScoreMap[a];
    const bValue = typeof b === 'number' ? b : StringScoreMap[b];
    return numberComparator(aValue, bValue);
};
