import { decorate, observable } from 'mobx';

class GameStore {
  CONFIG = {
    size: 5, // board 5x5
    turnLength: 120, // seconds
  };

  cells = [];
  selectedCells = [];
  players = [];
  secondsRemaining = 0;

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
    this.players = [
      {
        name: 'First Player',
        score: 0,
      },
      {
        name: 'A.I.',
        score: 0,
      }
    ];
  }

  _initTimer() {
    this.secondsRemaining = this.CONFIG.turnLength;
  }

  startTimer() {
    this.turnInterval = setInterval(() => {
      this.secondsRemaining--;
      if (this.secondsRemaining <= 0) {
        // change turn logic goes here
        clearInterval(this.turnInterval);
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.turnInterval);
  }

  markCellSelected(idx) {
    this.selectedCells[idx] = 1;
  }

  get fieldSize() {
    return this.CONFIG.size;
  }

  get playerOne() {
    return this.players[0];
  }

  get playerTwo() {
    return this.players[1];
  }
}

decorate(GameStore, {
  cells: observable,
  selectedCells: observable,
  players: observable,
  secondsRemaining: observable,
});

const gameStore = new GameStore();
export default gameStore;
