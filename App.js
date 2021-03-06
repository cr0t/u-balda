import React from 'react';
import AppNavigator from './screens/AppNavigator';
import { Provider } from 'mobx-react';
import GameStore from './stores/GameStore';
import Vocabulary from './lib/Vocabulary';
import AI from './lib/AI';

const DEFAULT_VOCABULARY = require('./data/2011freq.json');
const vocabulary = new Vocabulary();
vocabulary.loadWordsData(DEFAULT_VOCABULARY);

GameStore.vocabulary = vocabulary;
GameStore.ai = new AI(vocabulary);

export default class App extends React.Component {
  render() {
    return (
      <Provider GameStore={GameStore}>
        <AppNavigator/>
      </Provider>
    );
  }
}
