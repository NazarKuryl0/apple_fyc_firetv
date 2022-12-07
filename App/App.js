import React from 'react';
import {LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import createStore from './Core/Store';
import RootScreen from './Root';

const {store, persistor} = createStore();

LogBox.ignoreAllLogs();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    );
  }
}
