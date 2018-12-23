export type Score = number | string;

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
