import React from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

const WinnerModalView = inject('GameStore')(observer(class WinnerModalView extends React.Component {
  render() {
    const { GameStore } = this.props;
    const { winner } = GameStore;

    return (
      <Modal transparent={true}>
        <View style={styles.container}>
          <Text>Winner is {winner.name} with {winner.score} points.</Text>
          <Button title="Restart" onPress={() => { GameStore.startGame(); }} />
        </View>
      </Modal>
    );
  }
}));
export default WinnerModalView;

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
