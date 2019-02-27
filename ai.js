import Benchmark from 'benchmark';

import Vocabulary from './lib/Vocabulary';
import AI from './lib/AI';

const DATA = require('./data/2011freq.json');
const vocabulary = new Vocabulary();
vocabulary.loadWordsData(DATA);
const ai = new AI(vocabulary);

const cells3 = [
  '', '', '',
  'р', 'а', 'б',
  '', '', '',
];

const cells4 = [
  '', '', '', '',
  'п', 'л', 'о', 'в',
  '', '', '', '',
  '', '', '', '',
];

const cells5 = [
  '', '', '', '', '',
  '', '', '', '', '',
  'б', 'а', 'л', 'д', 'а',
  '', '', '', '', '',
  '', '', '', '', '',
];

const cellsComplex = [
  '', '', 'к', '', '',
  '', 'к', 'о', 'о', '',
  'б', 'а', 'ч', 'к', 'и',
  '', 'к', '', 'а', 'м',
  '', 'т', '', '', '',
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

// Rewrite AI from scratch, add HARD case
// findWord#3x3 x 2, 199 ops / sec ±2.36 % (81 runs sampled)
// findWord#4x4 x 1, 106 ops / sec ±1.72 % (83 runs sampled)
// findWord#5x5 x 610 ops / sec ±7.49 % (76 runs sampled)
// findWord#complex x 38.12 ops / sec ±2.00 % (56 runs sampled)
// findWord#hard x 0.15 ops / sec ±5.80 % (5 runs sampled)
// ✨  Done in 93.13s.

const suite = new Benchmark.Suite;

suite.add('findWord#3x3', function () {
  ai.findWord(cells3, 10);
}).add('findWord#4x4', function () {
  ai.findWord(cells4, 10);
}).add('findWord#5x5', function () {
  ai.findWord(cells5, 10);
}).add('findWord#complex', function () {
  ai.findWord(cellsComplex, 10);
}).add('findWord#hard', function () {
  ai.findWord(cellsHard, 10);
}).on('cycle', function (event) {
  console.log(String(event.target));
}).run({ 'async': true });

// --- character л
// _fillPaths: 2.670ms
// _optimizePathsFront: 11.137ms
// _generateChains: 122.628ms
// _findWords: 283.101ms
// character: 420.195ms
// ...
// --- character п
// _fillPaths: 1.966ms
// _optimizePathsFront: 14.744ms
// _generateChains: 173.214ms
// _findWords: 280.459ms
// character: 470.942ms
// ...
// --- character ф
// _fillPaths: 2.212ms
// _optimizePathsFront: 11.890ms
// _generateChains: 198.747ms
// _findWords: 280.511ms
// character: 493.904ms

//--- entryPoint: 4758.724ms

// console.log('--findWord', ai.findWord(cellsHard, 10));

// get the most long words from vocabulary
// console.log([...vocabulary.words].sort((a, b) => b.length - a.length).slice(0, 100).map(w => [w, w.length]));
