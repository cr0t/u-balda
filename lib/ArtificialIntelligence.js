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
        return data.words[0].length;
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
      const graph = this._buildCellsGraph(cellsCopy, idx);
      // console.log(util.inspect(graph, { showHidden: false, depth: null, colors: true }));
      const chains = this._findCharacterChains(graph);
      const words = this._checkChainsInVocabulary(chains);
      wordsByCharacter[c] = words.sort().reverse();
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

  _findCharacterChains(graph) {
    const paths = this._findGraphPaths(graph, [], []);
    let chains = [];

    paths.forEach((path) => {
      if (path.length > 2) {
        for (let i = 3; i < path.length; i += 1) {
          const chain = path.slice(0, i);
          chains.push(chain);
        }
      }
    });

    return chains;
  }

  // walk(branch, path, basket) {
  //   var fork = path.slice(0);
  //   var i = 0;
  //   var chld = branch.children;
  //   var len = chld.length;
  //   fork.push(branch.label);
  //   if (len === 0) {
  //     basket.push(fork);
  //     return basket;
  //   }
  //   for (i; i < len; i++) walk(chld[i], fork, basket);
  //   return basket;
  // }

  /*
  Given this matrix (represented in 1D array actually):

  -------------
  | A |   |   |
  -------------
  | B | C | D |
  -------------
  |   | F | E |
  -------------

  We should get this tree:
   A
   |
   B
   |
   C
   /\
  D  F
   \/
   E

  We need to get this data structure:
  {
    index: 0
    character: 'A',
    children: [
      {
        index: 3,
        character: 'B',
        children: [
          {
            index: 4,
            character: 'C',
            children: [
              {
                index: 5
                character: 'D',
                children: [
                  {
                    index: 8,
                    character: 'E'
                  }
                ]
              },
              {
                index: 7,
                character: 'F',
                children: [
                  {
                    index: 8,
                    character: 'E'
                  }
                ]
              ]
            ]
          }
        ]
      }
    ]
  }
  */

  _buildCellsGraph(cells, idx, visited = []) {
    let children = [];
    const neighbours = MatrixHelpers.crossNeighbours(this.fieldSize, idx);

    visited.push(idx);

    neighbours.forEach((newIdx) => {
      const notEmpty = (cells[newIdx] !== '');
      const notVisited = !visited.includes(newIdx);

      if (notEmpty && notVisited) {
        children.push(this._buildCellsGraph(cells, newIdx, visited.slice()));
      }
    });

    return {
      index: idx,
      character: cells[idx],
      leaf: (children.length === 0),
      children: children,
    };
  }

  _findGraphPaths(branch, path, basket) {
    const children = branch.children;
    const childrenCount = children.length;
    let fork = path.slice(0);

    fork.push(branch.character);

    if (childrenCount === 0) {
      basket.push(fork);
      return basket;
    }

    for (let i = 0; i < childrenCount; i += 1) {
      this._findGraphPaths(children[i], fork, basket);
    }

    return basket;
  }
}
