import { decorate, observable, action } from 'mobx';

// init vocabulary
import Vocabulary from '../lib/Vocabulary';
const DEFAULT_VOCABULARY = require('../data/2011freq.json');
const vocabulary = new Vocabulary();
vocabulary.loadWordsData(DEFAULT_VOCABULARY);

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

  clearSelectedCells() {
    const cellsCount = this.CONFIG.size ** 2;
    this.selectedCells = Array(cellsCount).fill(0);
    this.previousCellPressed = -1;
  }

  endTurn(word = '') {
    const currentPlayer = this.currentPlayer;

    this.moves.push({
      player: currentPlayer,
      word: word
    });

    this.updateScore(currentPlayer);
    this.addWordToBoard(word);

    // clear board and other temporals
    this.clearSelectedCells();
    this.stopTimer();
    this.resetTimer();
    this.startTimer();
  }

  markCellSelected(idx) {
    const numAlreadySelected = this.selectedCells.filter(cell => cell > 0).length;
    this.selectedCells[idx] = numAlreadySelected + 1;
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

  tryWord(word) {
    const wordHasOnlyOneMoreLetter = (word.length - this.prompt.length === 1);
    const wordExists = vocabulary.exists(word);

    if (wordHasOnlyOneMoreLetter && wordExists) {
      this.endTurn(word);
    }
  }

  addWordToBoard(word) {
    const character = word.split(this.prompt).join('');

    const emptyCellIndex = this.selectedCells.reduce((acc, cell, idx) => {
      const isSelected = (cell > 1);
      const isEmpty = (this.cells[idx] === '');

      if (isSelected && isEmpty) {
        return idx;
      }
      else {
        return acc;
      }
    });

    this.cells[emptyCellIndex] = character;
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

  get prompt() {
    let value = [];
    for (let i = 0; i <= this.selectedCells.length - 1; i++) {
      if (this.selectedCells[i] != 0) {
        value[this.selectedCells[i] - 1] = this.cells[i];
      }
    }
    return value.join('');
  }

  get readyForTry() {
    const numAlreadySelected = this.selectedCells.filter(cell => cell > 0).length;
    const selectedHasExactlyOneEmpty = this.selectedCells.map((cell, idx) => {
      if (cell > 0 && this.cells[idx] === '') {
        return 1;
      }
      else {
        return 0;
      }
    }).filter(el => el === 1).length === 1;

    if (numAlreadySelected > 2 && selectedHasExactlyOneEmpty) {
      return true;
    }

    return false;
  }
}

decorate(GameStore, {
  cells: observable,
  selectedCells: observable,
  previousCellPressed: observable,
  players: observable,
  secondsRemaining: observable,
  moves: observable,
  endTurn: action
});

const gameStore = new GameStore();
export default gameStore;
