import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import GameView from '../components/GameView';

export default class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Game',
  };

  render() {
    return (
      <View style={styles.container}>
        <GameView/>
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
