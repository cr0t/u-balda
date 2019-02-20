import React from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';

export default function GuessInput(props) {
  const isEditable = (props.value === '');

  return (
    <TextInput
      style={styles.input}
      editable={isEditable}
      autoFocus={isEditable}
      autoCapitalize='none'
      maxLength={1}
      defaultValue={props.value}
      onChangeText={props.onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'beige',
    borderColor: 'lightgray',
    borderWidth: 1,
    fontSize: 24,
    height: 40,
    marginLeft: -1,
    textAlign: 'center',
    width: 40,
  },
});
