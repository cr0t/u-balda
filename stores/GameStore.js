import { decorate, observable } from 'mobx';

class GameStore {
  config = {
    size: 5,
  };
  cells = [];
  selectedCells = [];
  players = [];

  constructor() {
    this._initCells();
    this._initPlayers();
    // TODO: remove this before production
    this.cells[10] = 'б';
    this.cells[11] = 'а';
    this.cells[12] = 'л';
    this.cells[13] = 'д';
    this.cells[14] = 'а';
  }

  _initCells() {
    const cellsCount = this.config.size ** 2;

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

  get size() {
    return this.config.size;
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
});

const gameStore = new GameStore();
export default gameStore;
