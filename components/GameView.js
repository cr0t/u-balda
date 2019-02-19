import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

import BoardView from './BoardView';
import PlayerView from './PlayerView';
import TimerView from './TimerView';
import MovesLogView from './MovesLogView';
import PromptModalView from './PromptModalView';

const GameView = inject('GameStore')(observer(class GameView extends React.Component {
  render() {
    const { GameStore } = this.props;
    const { playerOne, playerTwo, currentPlayer, secondsRemaining, moves } = GameStore;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <PlayerView name={playerOne.name} score={playerOne.score} current={playerOne === currentPlayer} />
          <TimerView secondsRemaining={secondsRemaining} />
          <PlayerView name={playerTwo.name} score={playerTwo.score} current={playerTwo === currentPlayer} />
        </View>
        <MovesLogView moves={moves} />
        <BoardView />
        <PromptModalView />
      </View>
    );
  }
}));
export default GameView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
