import Graph from './Graph';
import MatrixHelpers from './MatrixHelpers';

export default class ArtificialIntelligence {
  constructor(vocabulary) {
    this.vocabulary = vocabulary;
    this.characters = this.vocabulary.availableCharacters;
  }

  findWord(cells) {
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

    const bestMatch = this._findBestMatch(wordVariants);

    return bestMatch;
  }

  _findBestMatch(wordVariants) {
    const longestWordLength = wordVariants.map((data) => {
      if (data.words.length > 0) {
        return data.words.reduce((acc, w) => {
          const wordLength = w.length;
          if (acc < wordLength) {
            return wordLength;
          }
          return acc;
        });
      }
      return 0;
    }).sort().reverse()[0];

    const bestMatches = wordVariants.map((data) => {
      let match = data;
      match.words = data.words.filter(w => w.length >= longestWordLength);
      return match;
    }).filter(d => d.words.length >= 1);

    return bestMatches[Math.floor(Math.random() * bestMatches.length)];
  }

  _iterateCharacters(cells, idx) {
    let cellsCopy = cells.slice();
    let wordsByCharacter = {};

    this.characters.forEach(c => {
      cellsCopy[idx] = c;
      const chains = new Graph(cellsCopy, idx).getChains();
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
