import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

const TimerView = inject('GameStore')(observer(class TimerView extends React.Component {
  render() {
    const { secondsRemaining } = this.props.GameStore;
    let seconds = secondsRemaining % 60;
    let minutes = (secondsRemaining - seconds) / 60;

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.clock}>
          {minutes}:{seconds}
        </Text>
      </View>
    );
  }
}));
export default TimerView;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  clock: {
    fontWeight: 'bold',
  }
});
