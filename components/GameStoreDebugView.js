import React from 'react';
import { Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';

const GameStoreDebugView = inject('GameStore')(observer(class GameStoreDebugView extends React.Component {
  render() {
    const { GameStore } = this.props;

    return (
      <View>
        <Text>GameStore State</Text>
        <Text>Cells: [{GameStore.cells.join(',')}]</Text>
        <Text>Selected: [{GameStore.selectedCells.join(',')}]</Text>
      </View>
    );
  }
}));

export default GameStoreDebugView;
