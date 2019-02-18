import React from 'react';
import AppNavigator from './screens/AppNavigator';
import { Provider } from 'mobx-react';
import GameStore from './stores/GameStore';

export default class App extends React.Component {
  render() {
    return (
      <Provider GameStore={GameStore}>
        <AppNavigator/>
      </Provider>
    );
  }
}
