import React, {Component} from 'react';
import {View, BackHandler} from 'react-native';
import {connect} from 'react-redux';

import {Loader} from './Shared';
import {VALIDATE_USER} from './Core/Store/User/Actions';
import NavigationService from './Core/Services/NavigationService';
import AppNavigator from './AppNavigator';

class RootScreen extends Component {
  componentDidMount() {
    const {validateUser} = this.props;
    validateUser();
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack = () => {
    NavigationService.backBehavior();
    return true;
  };

  render() {
    const {isLoading} = this.props;
    return (
      <View style={{flex: 1}}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        {isLoading && <Loader />}
      </View>
    );
  }
}

const mapStateToProps = ({common}) => ({
  isLoading: common.isLoading,
});

const mapDispatchToProps = dispatch => ({
  validateUser: () => {
    dispatch({
      type: VALIDATE_USER,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen);
