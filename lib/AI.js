import Graph from './Graph';
import MatrixHelpers from './MatrixHelpers';

// Plan:
// 1. Go through every empty cells that touches text
// 2. Make a graph for each of them as entry point
// 3. Get paths for the graph
// 4. Optimize suffixes (remove path if its reversed version start with impossible characters case)
// 5. Go over all characters
// 6. Fill in this character into path
// 7. Optimize filled paths
// 8. Build chains from the paths
// 10. Find words: test given chains against vocabulary to find words (remember about already used words)
// 11. Find longest words in the variants
// 12. Return best matches
//
// Limitations:
// - the algorithm cannot find words if new character is in the middle, only starting a word, or ending it

export default class AI {
  constructor(vocabulary) {
    this._vocabulary = vocabulary;
  }

  findWord(cells, turnLimitSec, usedWords = []) {
    const t0 = Date.now(); // there is no performance.now() in React Native
    const turnLimitMS = turnLimitSec * 1000;
    const prefixes = this._vocabulary.prefixes;
    const characters = this._vocabulary.characters;

    let wordsVariants = {};

    this._entryPoints(cells).forEach((idx) => {
      const graph = new Graph(cells, idx);
      const paths = this._optimizePathsBack(graph.paths, prefixes);

      characters.forEach((char) => {
        const tChar = Date.now();

        // skip character if it takes too long already
        if (tChar - t0 < turnLimitMS) {
          const filledPaths = this._fillPaths(paths, char);
          const optimizedPaths = this._optimizePathsFront(filledPaths, prefixes);
          const possibleChains = this._generateChains(optimizedPaths);

          wordsVariants[[char, idx]] = {
            index: idx,
            character: char,
            words: this._findWords(possibleChains, usedWords)
          };
        }
      });
    });

    const bestMatches = this._findBestMatches(wordsVariants);

    return bestMatches[Math.floor(Math.random() * bestMatches.length)];
  }

  // Find all empty cells with at least one non-empty crossing neighbour
  // to use them as starting points for the graph
  _entryPoints(cells) {
    const fieldSize = Math.sqrt(cells);
    let entryPoints = [];

    for (let i = 0; i < cells.length; i += 1) {
      if (cells[i] === '') {
        const neighbours = MatrixHelpers.crossNeighbours(fieldSize, i);
        const someAreNotEmpty = neighbours.some(n => cells[n] !== '');

        if (someAreNotEmpty) {
          entryPoints.push(i);
        }
      }
    }

    return entryPoints;
  }

  // Replace first empty character with the given character
  _fillPaths(paths, char) {
    const filled = paths.map((path) => {
      path[0] = char;
      return path;
    });

    return filled;
  }

  // Generate all possible combinations (2+ chars) from the given paths
  _generateChains(paths) {
    let chains = [];

    paths.forEach((path) => {
      for (let i = 2; i <= path.length; i += 1) {
        const crumb = path.slice(0, i);
        chains.push(crumb);
      }
    });

    return chains;
  }

  // Test characters chains against vocabulary
  _findWords(chains, usedWords = []) {
    let words = [];

    chains.forEach((chain) => {
      const word = chain.join('');
      const reversed = chain.slice().reverse().join('');
      const wordExists = this._vocabulary.exists(word);
      const wordNotUsed = !usedWords.includes(word);
      const reversedExists = this._vocabulary.exists(reversed);
      const reversedNotUsed = !usedWords.includes(reversed);

      if (wordExists && wordNotUsed) {
        words.push(word);
      }

      if (reversedExists && reversedNotUsed) {
        words.push(reversed);
      }
    });

    return words;
  }

  // Returns best matches (longest words)
  _findBestMatches(wordsVariants) {
    let variants = [];

    const variantKeys = Object.keys(wordsVariants);
    const words = variantKeys.map((key) => wordsVariants[key]['words']).flat();

    if (words.length > 0) {
      const longestWord = words.reduce((a, b) => a.length > b.length ? a : b);

      variantKeys.map((key) => {
        const longWords = wordsVariants[key]['words'].filter((w) => w.length === longestWord.length);

        if (longWords.length > 0) {
          wordsVariants[key]['words'] = longWords;
          variants.push(wordsVariants[key]);
        }
      });
    }

    return variants;
  }

  // Remove paths that start with invalid prefixes if read backwards
  _optimizePathsBack(paths, validPrefixes) {
    const optimized = paths.filter((path) => {
      const length = path.length;
      const prefix = [path[length - 1], path[length - 2]].join('');
      return validPrefixes.has(prefix);
    });

    return optimized;
  }

  // Remove paths that start with invalid prefixes if read forward
  _optimizePathsFront(paths, validPrefixes) {
    const optimized = paths.filter((path) => {
      const prefix = [path[0], path[1]].join('');
      return validPrefixes.has(prefix);
    });

    return optimized;
  }
}
