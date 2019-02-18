import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import GameView from '../components/GameView';
import GameStoreDebugView from '../components/GameStoreDebugView';

export default class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Game',
  };

  render() {
    return (
      <View style={styles.container}>
        <GameView/>
        <GameStoreDebugView/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
