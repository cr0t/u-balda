import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function Cell(props) {
  const isEmpty = (props.value === '');
  const isSelected = props.selected;
  const showTryLabel = (props.justPressed && props.readyForTry);

  const cellStyle = [
    styles.cell,
    isEmpty && styles.cellEmpty,
    isSelected && styles.cellSelected,
    showTryLabel && styles.cellTryShown,
  ];

  const textStyle = [
    styles.cellText,
    showTryLabel && styles.cellTryText,
  ];

  return (
    <View style={cellStyle}>
      <TouchableOpacity style={styles.cellButton} onPress={props.onPress}>
        <Text style={textStyle}>
          {showTryLabel ? 'Try!' : props.value}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const sideSize = 62; // TODO: do something with that magic
const styles = StyleSheet.create({
  cell: {
    width: sideSize,
    height: sideSize,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginLeft: -1,
    marginTop: -1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellEmpty: {
    backgroundColor: 'beige',
  },
  cellSelected: {
    backgroundColor: 'pink',
  },
  cellTryShown: {
    backgroundColor: 'magenta',
  },
  cellButton: {
    width: sideSize,
    height: sideSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 24,
  },
  cellTryText: {
    color: '#fff',
    fontSize: 18,
  },
});
