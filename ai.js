import Benchmark from 'benchmark';

const Vocabulary = require('./lib/Vocabulary').default;
const ArtificialIntelligence = require('./lib/ArtificialIntelligence').default;

const DATA = require('./data/2011freq.json');

const vocabulary = new Vocabulary();
vocabulary.loadWordsData(DATA);
const ai = new ArtificialIntelligence(vocabulary);

const cells3 = [
  '',  '',  '',
  'р', 'а', 'б',
  '',  '',  '',
];

const cells4 = [
  '',  '',  '',  '',
  'п', 'л', 'о', 'в',
  '',  '',  '',  '',
  '',  '',  '',  '',
];

const cells5 = [
  '',  '',  '',  '',  '',
  '',  '',  '',  '',  '',
  'б', 'а', 'л', 'д', 'а',
  '',  '',  '',  '',  '',
  '',  '',  '',  '',  '',
];

const cellsComplex = [
  '',  '',  'к', '',  '',
  '',  'к', 'о', 'о', '',
  'б', 'а', 'ч', 'к', 'и',
  '',  'к', '',  'а', 'м',
  '',  'т', '',  '',  '',
];

const cellsHard = [
  'ш', 'т', 'ф', 'а', 'н',
  'д', 'р', 'а', 'з', 'а',
  'г', 'о', 'г', 'о', 'т',
  'у', 'н', 'я', 'п', 'ь',
  'б', 'ь', 'т', 'ь', '',
];

// Without any optimizations:
// findWord#3x3 x 66.20 ops / sec ±2.33 % (64 runs sampled)
// findWord#4x4 x 21.52 ops / sec ±2.56 % (38 runs sampled)
// findWord#5x5 x 10.59 ops / sec ±2.29 % (30 runs sampled)
// findWord#complex x 0.13 ops / sec ±1.76 % (5 runs sampled)
// ✨  Done in 95.30s.

// After changing way of storing words in Vocabulary to Set()
// findWord#3x3 x 2, 848 ops / sec ±0.62 % (86 runs sampled)
// findWord#4x4 x 1, 466 ops / sec ±0.46 % (91 runs sampled)
// findWord#5x5 x 813 ops / sec ±2.75 % (83 runs sampled)
// findWord#complex x 22.77 ops / sec ±2.38 % (40 runs sampled)
// ✨  Done in 24.91s.

// After removing unnecessary words candidates sorting
// findWord#3x3 x 2, 954 ops / sec ±0.62 % (87 runs sampled)
// findWord#4x4 x 1, 495 ops / sec ±1.98 % (88 runs sampled)
// findWord#5x5 x 882 ops / sec ±2.13 % (84 runs sampled)
// findWord#complex x 24.29 ops / sec ±2.05 % (42 runs sampled)
// ✨  Done in 24.94s.

// After fixing a bug in Graph#getChains method - it was reducing number of chains
// findWord#3x3 x 1, 727 ops / sec ±3.34 % (81 runs sampled)
// findWord#4x4 x 1, 023 ops / sec ±2.42 % (86 runs sampled)
// findWord#5x5 x 640 ops / sec ±2.67 % (84 runs sampled)
// findWord#complex x 20.02 ops / sec ±1.50 % (36 runs sampled)
// ✨  Done in 25.05s.

// After adding hard board example - 5x5 with one empty cell, and updated Graph#_build (visited.includes(newIdx) => visited[nIdx])
// findWord#3x3 x 1, 817 ops / sec ±1.61 % (84 runs sampled)
// findWord#4x4 x 1, 066 ops / sec ±2.19 % (85 runs sampled)
// findWord#5x5 x 686 ops / sec ±2.31 % (85 runs sampled)
// findWord#complex x 19.95 ops / sec ±2.61 % (36 runs sampled)
// findWord#hard x 0.03 ops / sec ±1.13 % (5 runs sampled)
// ✨  Done in 315.60s.

const suite = new Benchmark.Suite;

suite.add('findWord#3x3', function () {
  ai.findWord(cells3);
}).add('findWord#4x4', function () {
  ai.findWord(cells4);
}).add('findWord#5x5', function () {
  ai.findWord(cells5);
}).add('findWord#complex', function () {
  ai.findWord(cellsComplex);
}).add('findWord#hard', function () {
  ai.findWord(cellsHard);
}).on('cycle', function (event) {
  console.log(String(event.target));
}).run({ 'async': true });

// const cellsCycle = [
//   '',  'з', 'а',
//   'р', 'а', 'б',
//   '',  '',  '',
// ];

// console.log('--findWord', ai.findWord(cellsHard));
