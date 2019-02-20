import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

import MatrixHelpers from '../lib/MatrixHelpers';

function Cell(props) {
  const isEmpty = (props.value === '');
  const isSelected = props.selected;
  const showTryLabel = (props.justPressed && props.readyForTry);

  const cellStyle = [
    styles.cell,
    isEmpty && styles.cellEmpty,
    isSelected && styles.cellSelected,
    showTryLabel && styles.cellTryShown,
  ];

  const textStyle = [
    styles.cellText,
    showTryLabel && styles.cellTryText,
  ];

  return (
    <View style={cellStyle}>
      <TouchableOpacity style={styles.cellButton} onPress={props.onPress}>
        <Text style={textStyle}>
          {showTryLabel ? 'Try!' : props.value}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Row(props) {
  return <View style={styles.row}>{props.children}</View>;
}

function ClearButton(props) {
  const buttonStyle = [
    styles.clearButton,
    props.isHidden && styles.clearButtonHidden,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
      <Text>Clear</Text>
    </TouchableOpacity>
  );
}

const BoardView = inject('GameStore')(observer(class BoardView extends React.Component {
  onPressCell(idx) {
    const { GameStore } = this.props;
    const { previousCellPressed, fieldSize, selectedCells, readyForTry } = GameStore;

    const firstPress = (previousCellPressed === -1);
    const possibleMove = MatrixHelpers.isPossibleMove(fieldSize, previousCellPressed, idx);
    const notSelectedYet = (selectedCells[idx] === 0);

    if (firstPress || (possibleMove && notSelectedYet)) {
      GameStore.markCellSelected(idx);
    }

    if (previousCellPressed === idx && readyForTry) {
      GameStore.openPromptDialog();
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

  renderBoard(size) {
    const rows = [];

    for (let i = 0; i < size; i++) {
      const cells = [];
      for (let k = 0; k < size; k++) {
        cellId = i * size + k;
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

const sideSize = 64; // magic!
const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
    marginBottom: sideSize / 2,
  },
  header: {
    alignItems: 'flex-end',
  },
  clearButton: {
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 8,
    width: sideSize,
  },
  clearButtonHidden: {
    display: 'none',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: sideSize,
    height: sideSize,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginLeft: -1,
    marginTop: -1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellEmpty: {
    backgroundColor: 'beige',
  },
  cellSelected: {
    backgroundColor: 'pink',
  },
  cellTryShown: {
    backgroundColor: 'magenta',
  },
  cellButton: {
    width: sideSize,
    height: sideSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 24,
  },
  cellTryText: {
    color: '#fff',
    fontSize: 18,
  },
});
