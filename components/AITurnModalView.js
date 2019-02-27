import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class AITurnModalView extends React.Component {
  render() {
    return (
      <Modal transparent={true}>
        <View style={styles.container}>
          <Text>A.I. is looking for word...</Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 32,
  },
});
