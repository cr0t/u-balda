import React from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

import TimerView from './TimerView';

const PromptModalView = inject('GameStore')(observer(class PromptModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { guess: '' };
  }

  render() {
    const { GameStore } = this.props;
    const { prompt, readyForTry, secondsRemaining } = GameStore;
    const { guess } = this.state;
    const confirmDisabled = ((guess.length - prompt.length) !== 1);

    return (
      <View>
        <Modal visible={readyForTry}>
          <View style={styles.header}>
            <TimerView secondsRemaining={secondsRemaining} />
          </View>
          <View style={styles.container}>
            <TextInput style={styles.input} autoFocus={true} defaultValue={prompt} onChangeText={(guess) => this.setState({ guess: guess.trim() })} />
          </View>
          <View style={styles.footer}>
            <Button title="Guess!" disabled={confirmDisabled} onPress={() => GameStore.tryWord(guess)} />
            <Button title="Cancel" onPress={() => GameStore.clearSelectedCells()} />
          </View>
        </Modal>
      </View>
    );
  }
}));
export default PromptModalView;

const styles = StyleSheet.create({
  header: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderWidth: 1,
    fontSize: 24,
    marginTop: 32,
    padding: 8,
  }
});
