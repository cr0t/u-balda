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
    this.state = {
      guessChar: '',
      wordExists: true, // this and the next variable are used to show alerts
      usedYet: false
    };
  }

  componentDidMount() {
    this.setState({
      guessChar: '',
      wordExists: true, // reset any alerts were shown to user previously
      usedYet: false
    });
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

    let result = GameStore.tryWord(guessWord, guessChar);
    if (typeof result !== 'undefined') {
      this.setState({
        wordExists: result['wordExists'],
        usedYet: result['usedYet']
      });
    }
  }

  render() {
    const { GameStore } = this.props;
    const { secondsRemaining, prompt } = GameStore;
    const { guessChar, wordExists, usedYet } = this.state;
    const confirmDisabled = (guessChar.length === 0);

    const guessCells = prompt.map((char, idx) => {
      return <GuessInput
        key={'guess-input-' + idx}
        value={char}
        onChangeText={(guessChar) => this.setState({ guessChar, wordExists: true, usedYet: false })}
      />;
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

          <View style={styles.alerts}>
            {!wordExists && <Text style={styles.alert}>That word does not exist</Text>}
            {usedYet && <Text style={styles.alert}>We already used that word</Text>}
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
  alerts: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  alert: {
    color: 'red',
  },
  footer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
