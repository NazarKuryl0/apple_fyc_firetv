import React, {Component} from 'react';
import {View, BackHandler} from 'react-native';
import {connect} from 'react-redux';

import {Loader} from './Shared';
import {STARTUP} from './Core/Store/Startup/Actions';
import NavigationService from './Core/Services/NavigationService';
import AppNavigator from './AppNavigator';

class RootScreen extends Component {
  componentDidMount() {
    const {startup} = this.props;
    startup();
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack = () => {
    NavigationService.backBehavior();
    return true;
  };

  render() {
    const {loader, showBanner} = this.props;
    return (
      <View style={{flex: 1}}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        {!!(loader > 0) && <Loader showBanner={showBanner} />}
      </View>
    );
  }
}

const mapStateToProps = ({common, user, client, show}) => ({
  loader: common.loader,
  token: user.token,
  isFYCContent: client.isFYCContent,
  showBanner: show.showBanner,
});

const mapDispatchToProps = dispatch => ({
  startup: () => {
    dispatch({
      type: STARTUP,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen);
