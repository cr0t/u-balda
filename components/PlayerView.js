import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class PlayerView extends React.Component {
  render() {
    const { name, score, current } = this.props;

    return (
      <View style={styles.container}>
        <Text>{name}</Text>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.turn}>{current ? 'Turn!' : ''}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  score: {
    fontWeight: 'bold',
  },
  turn: {
    color: 'green',
    fontWeight: 'bold',
  }
});
