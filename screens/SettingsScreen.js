import React from 'react';
import {
  Button,
  Slider,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

const SettingsScreen = inject('GameStore')(observer(class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  LIMITS = {
    minFieldSize: 3,
    maxFieldSize: 6,
    minTurnLength: 60,
    maxTurnLength: 300,
    minTurnLimit: 1,
    maxTurnLimit: 5,
  }

  render() {
    const { GameStore } = this.props;
    const { playerOne, playerTwo, fieldSize, turnLength, aiTurnLimit } = GameStore;
    const turnLengthMinutes = turnLength / 60;

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text>Field size ({fieldSize}x{fieldSize}):</Text>
          <Slider
            minimumValue={this.LIMITS['minFieldSize']}
            maximumValue={this.LIMITS['maxFieldSize']}
            step={1}
            value={fieldSize}
            onValueChange={(v) => GameStore.setFieldSize(v)}
          />
        </View>

        <View style={styles.section}>
          <Text>Player A:</Text>
          <View style={styles.inputWithButton}>
            <TextInput
              style={styles.textInput}
              value={playerOne.name}
              onChangeText={(v) => GameStore.setPlayerOneName(v)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text>Player B:</Text>
          <View style={styles.inputWithButton}>
            <TextInput
              style={styles.textInput}
              value={playerTwo.name}
              onChangeText={(v) => GameStore.setPlayerTwoName(v)}
            />
            <View style={styles.buttonWrapper}>
              <Button title="Set to A.I." onPress={() => GameStore.setPlayerTwoName('A.I.')} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text>Turn ({turnLengthMinutes}m):</Text>
          <Slider
            minimumValue={this.LIMITS['minTurnLength']}
            maximumValue={this.LIMITS['maxTurnLength']}
            step={60}
            value={turnLength}
            onValueChange={(v) => GameStore.setTurnLength(v)}
          />
        </View>

        <View style={styles.section}>
          <Text>A.I. turn limit ({aiTurnLimit}s):</Text>
          <Slider
            minimumValue={this.LIMITS['minTurnLimit']}
            maximumValue={this.LIMITS['maxTurnLimit']}
            step={1}
            value={aiTurnLimit}
            onValueChange={(v) => GameStore.setTurnLimit(v)}
          />
        </View>
      </View>
    );
  }
}));
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  section: {
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 5,
    padding: 10,
  },
  buttonWrapper: {
    marginTop: 5,
  },
  inputWithButton: {
    flexDirection: 'row',
  },
});
