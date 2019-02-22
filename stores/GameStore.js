import { decorate, observable, action, computed } from 'mobx';

class GameStore {
  CONFIG = {
    size: 5,
    turnLength: 120, // seconds
  };

  initialWord = '';
  vocabulary; // configure it from outside
  ai;

  cells = [];
  selectedCells = [];
  previousCellPressed = -1;
  players = {};
  secondsRemaining = 0;
  moves = [];
  showPromptDialog = false;
  showWinnerDialog = false;

  constructor() {
    this._initCells();
    this._initPlayers();
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

  _startTimer() {
    this.turnInterval = setInterval(() => {
      this.secondsRemaining -= 1;
      if (this.secondsRemaining <= 0) {
        this.endTurn();
      }
    }, 1000);
  }

  _stopTimer() {
    clearInterval(this.turnInterval);
  }

  _resetTimer() {
    this.secondsRemaining = this.CONFIG.turnLength;
  }

  clearSelectedCells() {
    const cellsCount = this.CONFIG.size ** 2;
    this.selectedCells = Array(cellsCount).fill(0);
    this.previousCellPressed = -1;
  }

  startGame() {
    this.initialWord = this.vocabulary.getRandomWord(this.fieldSize);
    this._initCells();
    this._initPlayers();
    this.moves = [];

    const initialWordAsArray = this.initialWord.split('');
    let idxDelta = Math.floor(this.fieldSize / 2) * this.fieldSize;
    if (this.fieldSize % 2 === 0) {
      idxDelta -= this.fieldSize;
    }

    initialWordAsArray.forEach((char, idx) => {
      this.cells[idx + idxDelta] = char;
    });

    this.closeWinnerDialog();
    this.startTurn();
  }

  startTurn() {
    // clear board and other temporals
    this.closePromptDialog();
    this.clearSelectedCells();
    this._stopTimer();
    this._resetTimer();
    this._startTimer();

    if (this.currentPlayer.name == 'A.I.') {
      const guess = this.ai.findWord(this.cells, this.usedWords);
      if (guess) {
        const { index, character, words } = guess;
        this.selectedCells[index] = 1;
        this.endTurn(words[0], character);
      }
      else {
        this.endGame();
      }
    }
  }

  endGame() {
    this._stopTimer();
    this.openWinnerDialog();
  }

  endTurn(word = '', singleChar = '') {
    const currentPlayer = this.currentPlayer;

    this.moves.push({
      player: currentPlayer,
      word: word
    });

    if (singleChar !== '') {
      this._addCharToBoard(singleChar);
    }

    this._updateScore(currentPlayer);
    this.startTurn();
  }

  tryWord(word, singleChar) {
    const wordExists = this.vocabulary.exists(word);
    const usedWord = this.usedWords.includes(word);
    const usedAsInitial = (word === this.initialWord);
    const usedYet = (usedWord || usedAsInitial);

    if (wordExists && !usedYet) {
      this.endTurn(word, singleChar);
    }
  }

  markCellSelected(idx) {
    const numAlreadySelected = this.selectedCells.filter(cell => cell > 0).length;
    this.selectedCells[idx] = numAlreadySelected + 1;
    this.previousCellPressed = idx;
  }

  _updateScore(player) {
    player.score = this.moves.reduce((acc, moveData) => {
      if (moveData['player'] === player) {
        return acc + moveData['word'].length;
      }
      else {
        return acc;
      }
    }, 0);
  }

  _addCharToBoard(character) {
    const emptyCellIndex = this.selectedCells.reduce((acc, cell, idx) => {
      const isSelected = (cell >= 1);
      const isEmpty = (this.cells[idx] === '');

      if (isSelected && isEmpty) {
        return idx;
      }
      else {
        return acc;
      }
    }, 0);

    this.cells[emptyCellIndex] = character;
  }

  closePromptDialog() {
    this.clearSelectedCells();
    this.showPromptDialog = false;
  }

  openPromptDialog() {
    this.showPromptDialog = true;
  }

  closeWinnerDialog() {
    this.showWinnerDialog = false;
  }

  openWinnerDialog() {
    this.showWinnerDialog = true;
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
      value[this.selectedCells[i] - 1] = this.cells[i];
    }
    return value;
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

    if (numAlreadySelected > 1 && selectedHasExactlyOneEmpty) {
      return true;
    }

    return false;
  }

  get selectedCellsCount() {
    return this.selectedCells.filter(cell => cell >= 1).length;
  }

  get usedWords() {
    return [this.initialWord, this.moves.map((m) => { return m['word'] })].flat();
  }

  get winner() {
    return this.players['A'].score > this.players['B'].score ? this.players['A'] : this.players['B'];
  }
}

decorate(GameStore, {
  cells: observable,
  selectedCells: observable,
  previousCellPressed: observable,
  players: observable,
  secondsRemaining: observable,
  moves: observable,
  showPromptDialog: observable,
  showWinnerDialog: observable,
  usedWords: computed,
  winner: computed,
  markCellSelected: action,
  startGame: action,
  startTurn: action,
  endGame: action,
  endTurn: action,
  closePromptDialog: action,
  openPromptDialog: action,
  closeWinnerDialog: action,
  openWinnerDialog: action,
});

const gameStore = new GameStore();
export default gameStore;
