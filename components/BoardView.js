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
  const isSelected = (props.selected >= 1);

  return (
    <View style={[styles.cellContainer, isEmpty && styles.cellContainerEmpty, isSelected && styles.cellContainerSelected]}>
      <TouchableOpacity style={styles.cellButton} onPress={props.onPress}>
        <Text style={styles.cellText}>{props.value}</Text>
      </TouchableOpacity>
    </View>
  );
}

function Row(props) {
  return <View style={styles.row}>{props.children}</View>;
}

const BoardView = inject('GameStore')(observer(class BoardView extends React.Component {
  onPressCell(idx) {
    const { GameStore } = this.props;
    const { previousCellPressed, fieldSize, selectedCells } = GameStore;

    const firstPress = (previousCellPressed === -1);
    const possibleMove = MatrixHelpers.isPossibleMove(fieldSize, previousCellPressed, idx);
    const notSelectedYet = (selectedCells[idx] === 0);

    if (firstPress || (possibleMove && notSelectedYet)) {
      GameStore.markCellSelected(idx);
    }
  }

  renderCell(i) {
    const { GameStore } = this.props;
    const { cells, selectedCells } = GameStore;

    return (
      <Cell key={i} value={cells[i]} selected={selectedCells[i]} onPress={() => this.onPressCell(i)} />
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
        <Row key={i}>
          {cells}
        </Row>
      );
    }

    return rows;
  }

  render() {
    const { GameStore } = this.props;
    const rows = this.renderBoard(GameStore.fieldSize);

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.clearButton} onPress={() => { GameStore.clearSelectedCells() }}>
          <Text>Clear</Text>
        </TouchableOpacity>
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
  },
  row: {
    flexDirection: 'row',
  },
  cellContainer: {
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
  cellContainerEmpty: {
    backgroundColor: 'beige',
  },
  cellContainerSelected: {
    backgroundColor: 'pink',
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
  clearButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 8,
    width: sideSize,
  }
});
