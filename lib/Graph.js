import MatrixHelpers from './MatrixHelpers';
import util from 'util';

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
  constructor(cells, idx) {
    this.fieldSize = Math.sqrt(cells.length);
    this.graph = this._build(cells, idx);
    // console.log('------', idx);
    // console.log(util.inspect(this.graph, { showHidden: false, depth: null, colors: true }));
    // console.log(this.getChains());
  }

  getChains() {
    const paths = this._paths(this.graph, [], []);
    let chains = [];

    // Example:
    // --path  ['а', 'б', 'а', 'з', 'а', 'р']
    // --crumb ['а', 'б', 'а']
    // --crumb ['а', 'б', 'а', 'з']
    // --crumb ['а', 'б', 'а', 'з', 'а']
    // --crumb ['а', 'б', 'а', 'з', 'а', 'р']
    paths.forEach((path) => {
      for (let i = 3; i <= path.length; i += 1) {
        const crumb = path.slice(0, i);
        chains.push(crumb);
      }
    });

    return chains;
  }

  _build(cells, idx, visited = []) {
    let children = [];
    const neighbours = MatrixHelpers.crossNeighbours(this.fieldSize, idx);

    visited[idx] = idx;

    neighbours.forEach((newIdx) => {
      const notEmpty = (cells[newIdx] !== '');
      const notVisited = (typeof(visited[newIdx]) === 'undefined');

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
