import { comparator, Score } from '../deck';

describe('Fibonaci deck comparator: ', () => {
    it('should exist', () => {
        expect(comparator).toBeDefined();
    });

    it('should return -1 if a < b', () => {
        expect(comparator(1, 10)).toEqual(-1);
    });

    it('should return 1 if a > b', () => {
        expect(comparator(100, 10)).toEqual(1);
    });
    it('should return 0 if a == b', () => {
        expect(comparator(100, 100)).toEqual(0);
    });

    it('should sort an array of numbers', () => {
        const initialArray: Score[] = [0, -4, 5, 3, 10, -100];
        expect(initialArray.sort(comparator)).toEqual([-100, -4, 0, 3, 5, 10]);
    });
    it('should move string input to the end', () => {
        const initialArray: Score[] = [0, -4, 'coffee', 10];
        expect(initialArray.sort(comparator)).toEqual([-4, 0, 10, 'coffee']);
    });

    it('should sort string inputs in following order: Coffee < Question < Infinity', () => {
        const initialArray: Score[] = ['∞', 'question', 'coffee', 'question', '∞'];
        expect(initialArray.sort(comparator)).toEqual(['coffee', 'question', 'question', '∞', '∞']);
    });
    it('moves all null values to the end', () => {
        const initialArray: Score[] = [1, null, 'coffee', null, '∞'];
        expect(initialArray.sort(comparator)).toEqual([null, null, 1, 'coffee', '∞']);
    });
});
