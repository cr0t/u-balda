import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

import MatrixHelpers from '../lib/MatrixHelpers';

function Cell(props) {
  const isEmpty = (props.value === '');
  const isSelected = (props.selected >= 1);

  return (
    <View style={[styles.cellContainer, isEmpty && styles.cellContainerEmpty, isSelected && styles.cellContainerSelected]}>
      <TouchableHighlight style={styles.cellButton} onPress={props.onPress}>
        <Text style={styles.cellText}>{props.value}{isEmpty}</Text>
      </TouchableHighlight>
    </View>
  );
}

function Row(props) {
  return <View style={styles.row}>{props.children}</View>;
}

const BoardView = inject('GameStore')(observer(class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousCellPressed: -1
    }
  }

  onPressCell(idx) {
    const { previousCellPressed } = this.state;
    const { GameStore } = this.props;
    const fieldSize = GameStore.fieldSize;

    if (previousCellPressed === -1) {
      GameStore.markCellSelected(idx);
      this.setState({
        previousCellPressed: idx
      });
    }
    else if (MatrixHelpers.isPossibleMove(fieldSize, previousCellPressed, idx)) {
      GameStore.markCellSelected(idx);
      this.setState({
        previousCellPressed: idx
      });
    }
  }

  renderCell(i) {
    const { GameStore } = this.props;
    const { cells, selectedCells } = GameStore;

    return (
      <Cell key={i} value={cells[i].toString()} selected={selectedCells[i]} onPress={() => this.onPressCell(i)} />
    );
  }

  render() {
    const { GameStore } = this.props;
    let size = GameStore.fieldSize;

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

    return (
      <View style={styles.container}>
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
});
