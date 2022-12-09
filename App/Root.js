import React, {Component} from 'react';
import {View, BackHandler} from 'react-native';
import {connect} from 'react-redux';

import {Loader} from './Shared';
import {FYC, PRESS} from './Shared/Constants';
import {VALIDATE_USER} from './Core/Store/User/Actions';
import {RESET_LOADER} from './Core/Store/Common/Actions';
import {
  SET_CLIENT_AUTHORIZATION_HEADER,
  CHANGE_CLIENT_REFERER,
} from './Core/Store/Client/Actions';
import NavigationService from './Core/Services/NavigationService';
import AppNavigator from './AppNavigator';

class RootScreen extends Component {
  componentDidMount() {
    const {token, resetLoader} = this.props;
    resetLoader();
    if (token) {
      const {
        validateUser,
        setClientAuthorizationHeader,
        changeClientReferer,
        isFYCContent,
      } = this.props;
      setClientAuthorizationHeader(token);
      changeClientReferer(isFYCContent ? FYC : PRESS);
      validateUser();
    }
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack = () => {
    NavigationService.backBehavior();
    return true;
  };

  render() {
    const {loader} = this.props;
    return (
      <View style={{flex: 1}}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        {!!(loader > 0) && <Loader />}
      </View>
    );
  }
}

const mapStateToProps = ({common, user, client}) => ({
  loader: common.loader,
  token: user.token,
  isFYCContent: client.isFYCContent,
});

const mapDispatchToProps = dispatch => ({
  validateUser: () => {
    dispatch({
      type: VALIDATE_USER,
    });
  },
  changeClientReferer: data => {
    dispatch({
      type: CHANGE_CLIENT_REFERER,
      payload: data,
    });
  },
  setClientAuthorizationHeader: token => {
    dispatch({
      type: SET_CLIENT_AUTHORIZATION_HEADER,
      payload: token,
    });
  },
  resetLoader: () => {
    dispatch({
      type: RESET_LOADER,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen);
