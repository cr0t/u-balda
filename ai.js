const Vocabulary = require('./lib/Vocabulary').default;
const ArtificialIntelligence = require('./lib/ArtificialIntelligence').default;

const DATA = require('./data/2011freq.json');

const vocabulary = new Vocabulary();
vocabulary.loadWordsData(DATA);
const ai = new ArtificialIntelligence(vocabulary);

const cells = [
  '',  'о', 'к', '',  '',
  '',  'к', 'о', 'о', '',
  'б', 'а', 'ч', 'к', 'и',
  '',  'к', '',  'а', 'м',
  '',  'т', '',  '',  '',
];

console.log(ai.findWord(cells));
