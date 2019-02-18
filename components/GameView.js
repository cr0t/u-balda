import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

import BoardView from './BoardView';
import PlayerView from './PlayerView';
import TimerView from './TimerView';

const GameView = inject('GameStore')(observer(class GameView extends React.Component {
  render() {
    const { GameStore } = this.props;
    const { playerOne, playerTwo } = GameStore;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <PlayerView name={playerOne.name} score={playerOne.score}/>
          <TimerView seconds='120' />
          <PlayerView name={playerTwo.name} score={playerTwo.score}/>
        </View>
        {/* <TurnLogger/> */}
        <BoardView/>
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
