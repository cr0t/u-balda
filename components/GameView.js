import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import BoardView from './BoardView';
import PlayerView from './PlayerView';
import TimerView from './TimerView';

export default class GameView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <PlayerView name='Player One' currentScore='0' />
          <TimerView seconds='120' />
          <PlayerView name='Player A.I.' currentScore='0' />
        </View>
        {/* <TurnLogger/> */}
        <BoardView/>
      </View>
    );
  }
}

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
