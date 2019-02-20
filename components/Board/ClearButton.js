import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ClearButton(props) {
  const buttonStyle = [
    styles.button,
    props.isHidden && styles.hidden,
  ];

  return (
    <View>
      <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
        <Text>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 10,
    width: 60,
  },
  hidden: {
    display: 'none',
  },
});
