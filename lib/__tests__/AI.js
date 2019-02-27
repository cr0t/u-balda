import AI from '../AI'
import Vocabulary from '../Vocabulary'

const WORDS_DATA = [
  { 'drone': [6, 4.9] },
  { 'for': [9, 0.9] },
];
const vocabulary = new Vocabulary();
vocabulary.loadWordsData(WORDS_DATA);
const ai = new AI(vocabulary);

test('starts paths with the given character', () => {
  const input = [
    ['', 'b', 'a', 'r'],
    ['', 'o', 'r'],
    ['', 'r', 'o', 'n', 'e'],
  ];

  const output = [
    ['d', 'b', 'a', 'r'],
    ['d', 'o', 'r'],
    ['d', 'r', 'o', 'n', 'e'],
  ];

  expect(ai._fillPaths(input, 'd')).toEqual(output);
});

test('optimizes paths from back', () => {
  const input = [
    ['', 'b', 'a', 'r'], // <- rab*
    ['', 'o', 'r'], // <- ro*
    ['', 'r', 'o', 'n', 'e'], // <- enor*
  ];

  const validPrefixes = new Set([
    'ra',
    'ro'
  ]);

  const output = [
    ['', 'b', 'a', 'r'],
    ['', 'o', 'r'],
  ];

  expect(ai._optimizePathsBack(input, validPrefixes)).toEqual(output);
});

test('optimizes paths from front', () => {
  const input = [
    ['a', 'b', 'a', 'r'],
    ['f', 'o', 'r'],
    ['d', 'r', 'o', 'n', 'e'],
  ];

  const validPrefixes = new Set([
    'fo',
    'dr'
  ]);

  const output = [
    ['f', 'o', 'r'],
    ['d', 'r', 'o', 'n', 'e'],
  ];

  expect(ai._optimizePathsFront(input, validPrefixes)).toEqual(output);
});

test('finds all empty cells with at least one non-empty crossing neighbour', () => {
  const inputCells = [
    '',  's', 't',
    'f', 'o', 'r',
    '',  '',  '',
  ];
  const output = [0, 6, 7, 8];

  expect(ai._entryPoints(inputCells)).toEqual(output);

  const inputOtherCells = [
    '',  '',  'к', '',  '',
    '',  '',  'о', 'о', '',
    'б', 'а', 'ч', 'к', 'и',
    '',  'к', '',  'а', 'м',
    '',  'т', '',  '',  '',
  ]
  const outputOther = [0, 1, 3, 4, 5, 6, 9, 15, 17, 20, 22, 23, 24];

  expect(ai._entryPoints(inputOtherCells)).toEqual(outputOther);
});

test('generates all possible chains (2+ chars) from the given paths', () => {
  const inputPaths = [
    ['o', 'r'],
    ['a', 'b', 'a', 'r'],
    ['f', 'o', 'r'],
    ['d', 'r', 'o', 'n', 'e'],
  ];

  const outputChains = [
    ['o', 'r'],
    ['a', 'b'],
    ['a', 'b', 'a'],
    ['a', 'b', 'a', 'r'],
    ['f', 'o'],
    ['f', 'o', 'r'],
    ['d', 'r'],
    ['d', 'r', 'o'],
    ['d', 'r', 'o', 'n'],
    ['d', 'r', 'o', 'n', 'e'],
  ];

  expect(ai._generateChains(inputPaths)).toEqual(outputChains);
});

test('finds all possible words for the chains', () => {
  const inputChains = [
    ['a', 'b', 'a'],
    ['a', 'b', 'a', 'r'],
    ['f', 'o', 'r'],
    ['r', 'o', 'f'],
    ['d', 'r', 'o'],
    ['d', 'r', 'o', 'n'],
    ['d', 'r', 'o', 'n', 'e'],
  ];

  const words = [
    'for',
    'for',
    'drone'
  ];

  expect(ai._findWords(inputChains)).toEqual(words);

  const usedWords = [
    'for',
  ];

  expect(ai._findWords(inputChains, usedWords)).toEqual(['drone']);
});

test('searches for the longest variants in the found words', () => {
  const inputVariants = {
    'c,0': {
      index: 0,
      character: 'c',
      words: ['char', 'coo', 'clock', 'cone'],
    },
    'd,1': {
      index: 1,
      character: 'd',
      words: ['found', 'for', 'drone']
    }
  };

  const outputVariants = [{
    index: 0,
    character: 'c',
    words: ['clock'],
  }, {
    index: 1,
    character: 'd',
    words: ['found', 'drone']
  }];

  expect(ai._findBestMatches(inputVariants)).toEqual(outputVariants);
});
