import React from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

import TimerView from '../TimerView';
import GuessInput from './GuessInput';

const PromptModalView = inject('GameStore')(observer(class PromptModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { guessChar: '' };
  }

  componentDidMount() {
    this.setState({ guessChar: '' });
  }

  tryWord() {
    const { GameStore } = this.props;
    const { guessChar } = this.state;

    const guessWord = GameStore.prompt.map((char) => {
      if (char === '') {
        return guessChar;
      }

      return char;
    }).join('');

    GameStore.tryWord(guessWord, guessChar);
  }

  render() {
    const { GameStore } = this.props;
    const { secondsRemaining, prompt } = GameStore;
    const { guessChar } = this.state;
    const confirmDisabled = (guessChar.length === 0);

    const guessCells = prompt.map((char, idx) => {
      return <GuessInput key={'guess-input-' + idx} value={char} onChangeText={(guessChar) => this.setState({ guessChar })} />;
    });

    return (
      <Modal>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>Time's left:</Text>
            <TimerView secondsRemaining={secondsRemaining} />
          </View>

          <View style={styles.content}>
            {guessCells}
          </View>

          <View style={styles.footer}>
            <Button title="Guess!" disabled={confirmDisabled} onPress={() => this.tryWord()} />
            <Button title="Cancel" onPress={() => { GameStore.closePromptDialog(); }} />
          </View>
        </View>
      </Modal>
    );
  }
}));
export default PromptModalView;

const styles = StyleSheet.create({
  container: {
    flexBasis: '50%',
    marginHorizontal: 20,
    marginTop: 32,
  },
  header: {
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
