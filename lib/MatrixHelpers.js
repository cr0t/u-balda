export default class MatrixHelpers {
  /*
  LEFT_TOP = 1
  RIGHT_TOP = 2
  RIGHT_BOTTOM = 3
  LEFT_BOTTOM = 4
  TOP_EDGE = 10
  RIGHT_EDGE = 11
  BOTTOM_EDGE = 12
  LEFT_EDGE = 13
  */
  static whichCorner(sideSize, idx) {
    let square = sideSize ** 2;

    if (idx < 0 || idx > square - 1) {
      return false; // out of scope
    }

    if (idx === 0) {
      // LEFT_TOP
      return 1;
    }

    if ((idx + 1) === sideSize) {
      // RIGHT_TOP
      return 2;
    }

    if ((idx + 1) === square) {
      // RIGHT_BOTTOM
      return 3;
    }

    if (idx === (square - sideSize)) {
      // LEFT_BOTTOM
      return 4;
    }

    return false;
  }

  static whichEdge(sideSize, idx) {
    let square = sideSize ** 2;

    if (idx < 0 || idx > square - 1) {
      return false; // out of scope
    }

    if (idx < sideSize) {
      return 10; // TOP_EDGE
    }

    if ((idx + 1) % sideSize == 0) {
      return 11; // RIGHT_EDGE
    }

    if (idx >= square - sideSize) {
      return 12; // BOTTOM_EDGE
    }

    if ((idx + 1) % sideSize == 1) {
      return 13; // LEFT_EDGE
    }

    return false;
  }

  static crossNeighbours(sideSize, idx) {
    const corner = this.whichCorner(sideSize, idx);
    const edge = this.whichEdge(sideSize, idx);

    var neighbours = [];

    if (corner) {
      switch (corner) {
        case 1: // LEFT_TOP
          neighbours.push(idx + 1);
          neighbours.push(idx + sideSize);
          break;
        case 2: // RIGHT_TOP
          neighbours.push(idx - 1);
          neighbours.push(idx + sideSize);
          break;
        case 3: // RIGHT_BOTTOM
          neighbours.push(idx - sideSize);
          neighbours.push(idx - 1);
          break;
        case 4: // LEFT_BOTTOM
          neighbours.push(idx - sideSize);
          neighbours.push(idx + 1);
          break;
      }
    }
    else if (edge) {
      switch (edge) {
        case 10: // TOP_EDGE
          neighbours.push(idx - 1);
          neighbours.push(idx + 1);
          neighbours.push(idx + sideSize);
          break;
        case 11: // RIGHT_EDGE
          neighbours.push(idx - sideSize);
          neighbours.push(idx + sideSize);
          neighbours.push(idx - 1);
          break;
        case 12: // BOTTOM_EDGE
          neighbours.push(idx - 1);
          neighbours.push(idx + 1);
          neighbours.push(idx - sideSize);
          break;
        case 13: // LEFT_EDGE
          neighbours.push(idx - sideSize);
          neighbours.push(idx + sideSize);
          neighbours.push(idx + 1);
          break;
      }
    }
    else {
      neighbours.push(idx - sideSize);
      neighbours.push(idx + sideSize);
      neighbours.push(idx - 1);
      neighbours.push(idx + 1);
    }

    return neighbours;
  }

  static isPossibleMove(sideSize, previousStep, newStep) {
    return this.crossNeighbours(sideSize, previousStep).includes(newStep);
  }
}
