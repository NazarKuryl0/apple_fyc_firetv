import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {styles} from './styles';

export default class Loader extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
