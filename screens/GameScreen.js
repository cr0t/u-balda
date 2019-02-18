import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Game',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is game screen.</Text>
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
