import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

function FormattedClockView(props) {
  let seconds = props.seconds;
  let minutes = props.minutes;

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return <Text>{minutes}:{seconds}</Text>;
}

export default class TimerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: props.seconds
    };
  }

  tick() {
    this.setState((state) => ({
      secondsRemaining: state.secondsRemaining - 1
    }));

    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.tickInterval);
    }
  }

  componentDidMount() {
    this.tickInterval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);
  }

  render() {
    const { secondsRemaining } = this.state;
    const seconds = secondsRemaining % 60;
    const minutes = (secondsRemaining - seconds) / 60;

    return (
      <View style={styles.container}>
        <Text style={styles.clock}>
          <FormattedClockView seconds={seconds} minutes={minutes} />
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clock: {
    fontWeight: 'bold',
  }
});
