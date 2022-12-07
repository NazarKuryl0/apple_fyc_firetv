import React, {Component} from 'react';
import {View, BackHandler} from 'react-native';
import {connect} from 'react-redux';

import NavigationService from './Core/Services/NavigationService';
import AppNavigator from './AppNavigator';

class RootScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack = () => {
    NavigationService.backBehavior();
    return true;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen);
