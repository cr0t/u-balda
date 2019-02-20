import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

function WordInfo(props) {
  let word = props.word;
  const wordLength = word.toString().length;

  if (wordLength === 0) {
    word = '---';
  }

  return (
    <Text style={(wordLength === 0) && styles.emptyWord}>
      {word} ({wordLength})
    </Text>
  );
}

function Column(props) {
  return <View style={styles.column}>{props.children}</View>;
}

export default class MovesLogView extends React.Component {
  renderWordInfo(word, i) {
    return <WordInfo key={'word-info-' + i} word={word} />;
  }

  render() {
    const moves = this.props.moves;
    const words = moves.map((moveData) => {
      return moveData.word;
    });

    const columnsData = [[], []];
    for (let i = 0; i <= words.length - 1; i++) {
      let idx = i % 2;
      columnsData[idx].push(this.renderWordInfo(words[i], i));
    }

    const columns = [];
    for (let i = 0; i <= 1; i++) {
      columns[i] = <Column key={'move-info-column-' + i}>{columnsData[i]}</Column>;
    }

    return(
      <View style={styles.container}>
        {columns}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  emptyWord: {
    color: 'red',
  },
});
