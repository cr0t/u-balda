import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class PlayerView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.name}</Text>
        <Text style={styles.score}>{this.props.currentScore}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  score: {
    fontWeight: 'bold',
  }
});
