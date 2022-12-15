import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';

import {styles} from './styles';

export default class Loader extends React.Component {
  render() {
    const {showBanner} = this.props;
    return (
      <View style={styles.root}>
        {!!showBanner && (
          <FastImage
            source={{uri: showBanner, priority: FastImage.priority.high}}
            style={styles.background}
          />
        )}
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
