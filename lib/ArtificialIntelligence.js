import Graph from './Graph';
import MatrixHelpers from './MatrixHelpers';

export default class ArtificialIntelligence {
  constructor(vocabulary) {
    this.vocabulary = vocabulary;
    this.characters = this.vocabulary.availableCharacters;
  }

  findWord(cells, usedWords = []) {
    this.fieldSize = Math.sqrt(cells.length);
    let wordVariants = [];

    cells.forEach((cell, idx) => {
      const neighbours = MatrixHelpers.crossNeighbours(this.fieldSize, idx);
      const nonEmptyNeighboursCount = neighbours.reduce((acc, nIdx) => {
        if (cells[nIdx] !== '') {
          acc += 1;
        }
        return acc;
      }, 0);

      if (cell === '' && nonEmptyNeighboursCount >= 1) {
        let wordsByCharacter = this._iterateCharacters(cells, idx);
        Object.keys(wordsByCharacter).forEach((char) => {
          wordVariants.push({
            index: idx,
            character: char,
            words: wordsByCharacter[char]
          });
        });
      }
    });

    const bestMatch = this._findBestMatch(wordVariants, usedWords);

    return bestMatch;
  }

  _findBestMatch(wordVariants, usedWords) {
    usedWords = new Set(usedWords);
    wordVariants = wordVariants.filter(variant => variant.words.length > 0);
    wordVariants = wordVariants.map((data) => {
      let match = data;
      match.words = data.words.filter(w => !usedWords.has(w));
      return match;
    }).filter(d => d.words.length >= 1);

    const longestWordsLength = wordVariants.reduce((acc, variant) => {
      const longestWordLength = variant.words.reduce((a, b) => { return a.length > b.length ? a.length : b.length; }, 0);
      return acc > longestWordLength ? acc : longestWordLength;
    }, 0);

    const bestMatches = wordVariants.map((data) => {
      let match = data;
      match.words = data.words.filter(w => w.length >= longestWordsLength);
      return match;
    }).filter(d => d.words.length >= 1);

    return bestMatches[Math.floor(Math.random() * bestMatches.length)];
  }

  _iterateCharacters(cells, idx) {
    let cellsCopy = cells.slice();
    let wordsByCharacter = {};

    this.characters.forEach(c => {
      cellsCopy[idx] = c;
      const graph = new Graph(cellsCopy, idx);
      const chains = graph.getChains();
      wordsByCharacter[c] = this._checkChainsInVocabulary(chains);
    });

    return wordsByCharacter;
  }

  _checkChainsInVocabulary(chains) {
    let words = [];

    chains.forEach((chain) => {
      const word = chain.join('');
      const reversedWord = chain.reverse().join('');

      if (this.vocabulary.exists(word) && !words.includes(word)) {
        words.push(word);
      }

      if (this.vocabulary.exists(reversedWord) && !words.includes(word)) {
        words.push(reversedWord);
      }
    });

    return words;
  }
}
