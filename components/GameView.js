import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

import GameStoreDebugView from '../components/GameStoreDebugView';

import BoardView from './Board/BoardView';
import PlayerView from './PlayerView';
import TimerView from './TimerView';
import MovesLogView from './MovesLogView';
import PromptModalView from './Prompt/PromptModalView';
import WinnerModalView from './WinnerModalView';
import AITurnModalView from './AITurnModalView';

const GameView = inject('GameStore')(observer(class GameView extends React.Component {
  componentDidMount() {
    this.props.GameStore.startGame();
  }

  render() {
    const { GameStore } = this.props;
    const { playerOne, playerTwo, currentPlayer, secondsRemaining, moves, readyForTry, showPromptDialog, showWinnerDialog, showAITurnDialog } = GameStore;
    const showPromptModal = (readyForTry && showPromptDialog);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerItem}>
            <PlayerView name={playerOne.name} score={playerOne.score} current={playerOne === currentPlayer} />
          </View>
          <View style={styles.headerItem}>
            <TimerView secondsRemaining={secondsRemaining} />
          </View>
          <View style={styles.headerItem}>
            <PlayerView name={playerTwo.name} score={playerTwo.score} current={playerTwo === currentPlayer} />
          </View>
        </View>
        <View style={styles.moves}>
          <MovesLogView moves={moves} />
        </View>
        <View style={styles.board}>
          <BoardView />
        </View>
        {showPromptModal && <PromptModalView />}
        {showWinnerDialog && <WinnerModalView />}
        {showAITurnDialog && <AITurnModalView />}
        {/* <GameStoreDebugView/> */}
      </View>
    );
  }
}));
export default GameView;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  header: {
    flex: 0,
    flexDirection: 'row',
    paddingBottom: 20,
  },
  headerItem: {
    flex: 1,
    justifyContent: 'center',
  },
  moves: {
    flex: 1,
    paddingBottom: 20,
  },
  board: {
    flex: 0,
  }
});
