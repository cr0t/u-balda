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
        <Text>PlayerOne: [{GameStore.playerOne.name}, {GameStore.playerOne.score}]</Text>
        <Text>PlayerTwo: [{GameStore.playerTwo.name}, {GameStore.playerTwo.score}]</Text>
        <Text>SecondsRemaining: {GameStore.secondsRemaining}</Text>
      </View>
    );
  }
}));

export default GameStoreDebugView;
