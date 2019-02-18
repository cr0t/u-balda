import { decorate, observable } from 'mobx';

class GameStore {
  config = {
    size: 5,
  };
  cells = [];
  selectedCells = [];

  constructor() {
    this._initCells();
    this._initCellsDebug(); // TODO: remove this before production
  }

  _initCells() {
    const cellsCount = this.config.size ** 2;

    this.cells = Array(cellsCount).fill('');
    this.selectedCells = Array(cellsCount).fill(0);
  }

  // TODO: remove this before production
  _initCellsDebug() {
    this.cells[10] = 'б';
    this.cells[11] = 'а';
    this.cells[12] = 'л';
    this.cells[13] = 'д';
    this.cells[14] = 'а';
  }
}

decorate(GameStore, {
  cells: observable,
  selectedCells: observable,
});

const gameStore = new GameStore();
export default gameStore;
