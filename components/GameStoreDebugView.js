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
        <Text>PlayerOne: [{GameStore.playerOne.name}, {GameStore.playerOne.score}, {GameStore.currentPlayer === GameStore.playerOne ? 'current' : ''}]</Text>
        <Text>PlayerTwo: [{GameStore.playerTwo.name}, {GameStore.playerTwo.score}, {GameStore.currentPlayer === GameStore.playerTwo ? 'current' : ''}]</Text>
        <Text>SecondsRemaining: {GameStore.secondsRemaining}</Text>
        <Text>ReadyForTry and prompt: [{GameStore.readyForTry}, {GameStore.prompt}]</Text>
        <Text>Show Dialogs: [prompt: {GameStore.showPromptDialog ? 'true' : 'false'}, winner: {GameStore.showPromptDialog ? 'true' : 'false'}]</Text>
      </View>
    );
  }
}));

export default GameStoreDebugView;
