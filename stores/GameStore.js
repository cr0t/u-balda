import { decorate, observable } from 'mobx';

class GameStore {
  CONFIG = {
    size: 5, // board 5x5
    turnLength: 120, // seconds
  };

  cells = [];
  selectedCells = [];
  previousCellPressed = -1;
  players = {};
  secondsRemaining = 0;
  moves = [];

  constructor() {
    this._initCells();
    this._initPlayers();
    this._initTimer();
    // TODO: remove this before production
    this.cells[10] = 'б';
    this.cells[11] = 'а';
    this.cells[12] = 'л';
    this.cells[13] = 'д';
    this.cells[14] = 'а';
  }

  _initCells() {
    const cellsCount = this.CONFIG.size ** 2;

    this.cells = Array(cellsCount).fill('');
    this.selectedCells = Array(cellsCount).fill(0);
  }

  _initPlayers() {
    this.players = {
      'A': {
        name: 'First Player',
        score: 0,
      },
      'B': {
        name: 'A.I.',
        score: 0,
      }
    };
  }

  _initTimer() {
    this.secondsRemaining = this.CONFIG.turnLength;
  }

  startTimer() {
    this.turnInterval = setInterval(() => {
      this.secondsRemaining -= 1;
      if (this.secondsRemaining <= 0) {
        this.endTurn();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.turnInterval);
  }

  resetTimer() {
    this.secondsRemaining = this.CONFIG.turnLength;
  }

  endTurn(word = '') {
    const currentPlayer = this.currentPlayer;
    const cellsCount = this.CONFIG.size ** 2;

    this.moves.push({
      player: currentPlayer,
      word: word
    });

    this.selectedCells = Array(cellsCount).fill(0);

    this.updateScore(currentPlayer);

    this.stopTimer();
    this.resetTimer();
    this.startTimer();
  }

  markCellSelected(idx) {
    this.selectedCells[idx] = 1;
    this.previousCellPressed = idx;
  }

  updateScore(player) {
    player.score = this.moves.reduce((acc, moveData) => {
      if (moveData['player'] === player) {
        return acc + moveData['word'].length;
      }
      else {
        return acc;
      }
    }, 0);
  }

  get fieldSize() {
    return this.CONFIG.size;
  }

  get playerOne() {
    return this.players['A'];
  }

  get playerTwo() {
    return this.players['B'];
  }

  get currentPlayer() {
    if (this.moves.length % 2 == 0) {
      return this.players['A'];
    }
    else {
      return this.players['B'];
    }
  }
}

decorate(GameStore, {
  cells: observable,
  selectedCells: observable,
  previousCellPressed: observable,
  players: observable,
  secondsRemaining: observable,
  moves: observable,
});

const gameStore = new GameStore();
export default gameStore;
