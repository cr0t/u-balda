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

// Without any optimizations:
// findWord#3x3 x 66.20 ops / sec ±2.33 % (64 runs sampled)
// findWord#4x4 x 21.52 ops / sec ±2.56 % (38 runs sampled)
// findWord#5x5 x 10.59 ops / sec ±2.29 % (30 runs sampled)
// findWord#5x5 - complex x 0.13 ops / sec ±1.76 % (5 runs sampled)
// Fastest is findWord#3x3
// ✨  Done in 95.30s.

const suite = new Benchmark.Suite;

suite.add('findWord#3x3', function () {
  ai.findWord(cells3);
}).add('findWord#4x4', function () {
  ai.findWord(cells4);
}).add('findWord#5x5', function () {
  ai.findWord(cells5);
}).add('findWord#5x5-complex', function () {
  ai.findWord(cellsComplex);
}).on('cycle', function (event) {
  console.log(String(event.target));
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
}).run({ 'async': true });
