import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

import MatrixHelpers from '../../lib/MatrixHelpers';

import ClearButton from './ClearButton';
import Row from './Row';
import Cell from './Cell';

const BoardView = inject('GameStore')(observer(class BoardView extends React.Component {
  onPressCell(idx) {
    const { GameStore } = this.props;
    const { previousCellPressed, fieldSize, cells, selectedCells, readyForTry } = GameStore;

    const firstPress = (previousCellPressed === -1);
    const possibleMove = MatrixHelpers.isPossibleMove(fieldSize, previousCellPressed, idx);
    const notSelectedYet = (selectedCells[idx] === 0);
    const isEmpty = (cells[idx] === '');
    const neighboursEmpty = areAllNeighboursEmpty(fieldSize, idx, cells);
    const alreadyHasEmptySelected = selectedCellsContainsOneEmpty(selectedCells, cells);
    const pressedTwice = (previousCellPressed === idx);

    if (pressedTwice && readyForTry) {
      GameStore.openPromptDialog();
      return;
    }

    if (firstPress && neighboursEmpty) {
      return;
    }

    if (isEmpty && alreadyHasEmptySelected) {
      return;
    }

    if (firstPress || (possibleMove && notSelectedYet)) {
      GameStore.markCellSelected(idx);
      return;
    }
  }

  renderCell(idx) {
    const { GameStore } = this.props;
    const { cells, selectedCells, previousCellPressed, readyForTry } = GameStore;
    const justPressed = (previousCellPressed === idx);
    const isSelected = (selectedCells[idx] >= 1);

    return (
      <Cell
        key={'cell-' + idx}
        value={cells[idx]}
        selected={isSelected}
        justPressed={justPressed}
        readyForTry={readyForTry}
        onPress={() => this.onPressCell(idx)}
      />
    );
  }

  renderBoard(fieldSize) {
    const rows = [];

    for (let i = 0; i < fieldSize; i++) {
      const cells = [];
      for (let k = 0; k < fieldSize; k++) {
        cellId = i * fieldSize + k;
        cells.push(this.renderCell(cellId));
      }

      rows.push(
        <Row key={'row-' + i}>
          {cells}
        </Row>
      );
    }

    return rows;
  }

  render() {
    const { GameStore } = this.props;
    const { selectedCellsCount, fieldSize } = GameStore;
    const hideClearButton = (selectedCellsCount === 0);
    const rows = this.renderBoard(fieldSize);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ClearButton isHidden={hideClearButton} onPress={() => GameStore.clearSelectedCells()}/>
        </View>
        {rows}
      </View>
    );
  }
}));
export default BoardView;

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
    paddingLeft: 1,
  },
  header: {
    alignItems: 'flex-end',
  },
});

//
// Some additional helpers for the users' selection logic
//

function areAllNeighboursEmpty(fieldSize, idx, cells) {
  const neighbours = MatrixHelpers.crossNeighbours(fieldSize, idx);
  const nonEmptyCount = neighbours.map(idx => cells[idx]).filter(v => v !== '').length;
  return (nonEmptyCount === 0);
}

function selectedCellsContainsOneEmpty(selectedCells, cells) {
  const countSelectedEmptyCells = selectedCells.reduce((acc, cell, idx) => {
    if (cell > 0 && cells[idx] === '') {
      return acc += 1;
    }

    return acc;
  }, 0);

  return (countSelectedEmptyCells === 1);
}
