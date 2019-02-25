import MatrixHelpers from './MatrixHelpers';

/*
  Graph builder, resolvers for available paths, etc.

  Given this matrix (represented as 1D array):
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

export default class Graph {
  constructor(cells, idx, availablePrefixes) {
    this.fieldSize = Math.sqrt(cells.length);
    this.graph = this._build(cells, idx);
    this.prefixes = availablePrefixes;
    // console.log(util.inspect(this.graph, { showHidden: false, depth: null, colors: true }));
  }

  getPaths() {
    return this._paths(this.graph, [], []);
  }

  _build(cells, idx, visited = []) {
    let children = [];
    const neighbours = MatrixHelpers.crossNeighbours(this.fieldSize, idx);

    visited.push(idx);

    neighbours.forEach((newIdx) => {
      const notEmpty = (cells[newIdx] !== '');
      const notVisited = !visited.includes(newIdx);

      if (notEmpty && notVisited) {
        children.push(this._build(cells, newIdx, visited.slice()));
      }
    });

    return {
      index: idx,
      character: cells[idx],
      children: children,
    };
  }

  _paths(branch, path, basket) {
    const children = branch.children;
    const childrenCount = children.length;
    let fork = path.slice(0);

    fork.push(branch.character);

    if (fork.length === 2 && !this.prefixes[2].has(fork.join(''))) {
      return basket;
    }

    if (fork.length === 3 && !this.prefixes[3].has(fork.join(''))) {
      return basket;
    }

    if (childrenCount === 0) {
      basket.push(fork);
      return basket;
    }

    for (let i = 0; i < childrenCount; i += 1) {
      this._paths(children[i], fork, basket);
    }

    return basket;
  }
}
