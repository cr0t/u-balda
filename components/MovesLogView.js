import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

function MoveLine(props) {
  const word = props.word;
  const wordLength = word.length;
  return <Text>{word} ({wordLength})</Text>;
}

export default class MovesLogView extends React.Component {
  renderMoveLine(word, i) {
    return <MoveLine key={i} word={word}/>
  }

  render() {
    const moves = this.props.moves;
    let moveLines = [];

    moveLines = moves.map((log, i) => {
      return this.renderMoveLine(log.word, i);
    });

    return(
      <View style={styles.container}>
        {moveLines}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  }
});
