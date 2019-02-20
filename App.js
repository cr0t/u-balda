import React from 'react';
import AppNavigator from './screens/AppNavigator';
import { Provider } from 'mobx-react';
import GameStore from './stores/GameStore';

import Vocabulary from './lib/Vocabulary';
const DEFAULT_VOCABULARY = require('./data/2011freq.json');
GameStore.vocabulary = new Vocabulary();
GameStore.vocabulary.loadWordsData(DEFAULT_VOCABULARY);

export default class App extends React.Component {
  render() {
    return (
      <Provider GameStore={GameStore}>
        <AppNavigator/>
      </Provider>
    );
  }
}
