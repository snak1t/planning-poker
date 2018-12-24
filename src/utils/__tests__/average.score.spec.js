import { calculateAverage } from '../average.score';
describe('Fibonacci calculator', () => {
  it('returns score if every player have the same score', () => {
    const players = [{ login: 'John', score: 3 }, { login: 'Jane', score: 3 }];
    expect(calculateAverage(players)).toBe(3);
  });

  it('it return 5 for 8 and 3', () => {
    const players = [{ login: 'John', score: 8 }, { login: 'Jane', score: 3 }];
    expect(calculateAverage(players)).toBe(5);
  });

  it('it return 5 for 8, 3, 3', () => {
    const players = [
      { login: 'John', score: 8 },
      { login: 'Jane', score: 3 },
      { login: 'Ash', score: 3 }
    ];
    expect(calculateAverage(players)).toBe(5);
  });

  it('returns 13 for 8 and 21', () => {
    const players = [{ login: 'John', score: 21 }, { login: 'Jane', score: 8 }];
    expect(calculateAverage(players)).toBe(13);
  });

  it('returns 21 for 8 and 34', () => {
    const players = [{ login: 'John', score: 34 }, { login: 'Jane', score: 8 }];
    expect(calculateAverage(players)).toBe(21);
  });

  it('returns 21 for 8 and 55', () => {
    const players = [{ login: 'John', score: 55 }, { login: 'Jane', score: 8 }];
    expect(calculateAverage(players)).toBe(21);
  });

  it('returns 13 for 8, 8 and 21', () => {
    const players = [
      { login: 'John', score: 8 },
      { login: 'Jane', score: 8 },
      { login: 'Ash', score: 21 }
    ];
    expect(calculateAverage(players)).toBe(13);
  });

  it('return a string if one of answers is a string', () => {
    const players = [
      { login: 'John', score: 8 },
      { login: 'Jane', score: 8 },
      { login: 'Ash', score: 'string' }
    ];
    const score = calculateAverage(players);
    expect(typeof score).toBe('string');
  });

  it('return string "Unclear" if one of score is "?"', () => {
    const players = [
      { login: 'John', score: 8 },
      { login: 'Jane', score: 8 },
      { login: 'Ash', score: 'question' }
    ];
    expect(calculateAverage(players)).toBe('Unclear');
  });

  it('return "Infinity" if one of score is "\u221e"', () => {
    const players = [
      { login: 'John', score: 8 },
      { login: 'Jane', score: 8 },
      { login: 'Ash', score: '\u221e' }
    ];
    expect(calculateAverage(players)).toBe('Infinity');
  });

  it('favor Unclear to Infinity', () => {
    const players = [
      { login: 'John', score: 8 },
      { login: 'Jane', score: 'question' },
      { login: 'Ash', score: '\u221e' }
    ];
    expect(calculateAverage(players)).toBe('Unclear');
  });

  it('return "Coffee break" if one of answer is "coffee"', () => {
    const players = [
      { login: 'John', score: 8 },
      { login: 'Jane', score: 1 },
      { login: 'Ash', score: 'coffee' }
    ];
    expect(calculateAverage(players)).toBe('Coffee break');
  });

  it('favor "Coffee break" to others', () => {
    const players = [
      { login: 'John', score: '\u221e' },
      { login: 'Jane', score: 'question' },
      { login: 'Ash', score: 'coffee' }
    ];
    expect(calculateAverage(players)).toBe('Coffee break');
  });

  it('if it contains different string, it return Unclear', () => {
    const players = [
      { login: 'John', score: 1 },
      { login: 'Jane', score: 2 },
      { login: 'Ash', score: 'whatahell' }
    ];
    expect(calculateAverage(players)).toBe('Unclear');
  });
});
