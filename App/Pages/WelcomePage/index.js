import React from 'react';
import {View, Text, TouchableOpacity, findNodeHandle} from 'react-native';
import {connect} from 'react-redux';

import {CHANGE_CLIENT_REFERER} from '../../Core/Store/Client/Actions';
import {FYC, PRESS, LINK} from '../../Shared/Constants';
import Navigator from '../../Core/Services/NavigationService';

import {styles} from './styles';

const pressDescription =
  'Access to this app is limited to members of the press. To start watching, sign in with your preauthorized email and password.';
const fycDescription =
  'Access to this app is limited to awards voters and requires a preauthorized code. To start watching, sign in with your access code.';

class WelcomePage extends React.Component {
  state = {
    focusedItem: FYC,
  };

  componentDidMount() {
    Navigator.push('WelcomePage');
    this.FYCButton.setNativeProps({
      nextFocusUp: findNodeHandle(this.FYCButton),
      nextFocusLeft: findNodeHandle(this.FYCButton),
      nextFocusRight: findNodeHandle(this.FYCButton),
      nextFocusDown: findNodeHandle(this.PRESSButton),
    });
    this.PRESSButton.setNativeProps({
      nextFocusUp: findNodeHandle(this.FYCButton),
      nextFocusLeft: findNodeHandle(this.PRESSButton),
      nextFocusRight: findNodeHandle(this.PRESSButton),
      nextFocusDown: findNodeHandle(this.link),
    });
    this.link.setNativeProps({
      nextFocusUp: findNodeHandle(this.PRESSButton),
      nextFocusLeft: findNodeHandle(this.link),
      nextFocusRight: findNodeHandle(this.link),
      nextFocusDown: findNodeHandle(this.link),
    });
  }

  handleItemFocus = item => {
    this.setState({focusedItem: item});
  };

  handleItemPress = item => {
    const {changeClientReferer} = this.props;
    if (item === FYC) {
      changeClientReferer(FYC);
      Navigator.navigate('FYCSignInPage');
    } else if (item === PRESS) {
      changeClientReferer(PRESS);
      Navigator.navigate('PRESSSignInEmailPage');
    }
  };

  render() {
    const {focusedItem} = this.state;
    const {isFYCContent} = this.props;
    const descriptionText =
      focusedItem === FYC ? fycDescription : pressDescription;
    return (
      <View style={styles.root}>
        <View style={styles.main}>
          <Text style={styles.header}>Welcome to Screeners for Apple TV+</Text>
          <Text style={styles.description}>{descriptionText}</Text>
          <TouchableOpacity
            hasTVPreferredFocus={isFYCContent}
            activeOpacity={1}
            ref={ref => (this.FYCButton = ref)}
            onFocus={this.handleItemFocus.bind(this, FYC)}
            onPress={this.handleItemPress.bind(this, FYC)}
            style={[
              styles.buttonBlock,
              focusedItem === FYC && styles.buttonBlockActive,
            ]}>
            <Text
              style={[
                styles.buttonText,
                focusedItem === FYC && styles.buttonTextActive,
              ]}>
              {FYC}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            hasTVPreferredFocus={!isFYCContent}
            ref={ref => (this.PRESSButton = ref)}
            onFocus={this.handleItemFocus.bind(this, PRESS)}
            onPress={this.handleItemPress.bind(this, PRESS)}
            style={[
              styles.buttonBlock,
              focusedItem === PRESS && styles.buttonBlockActive,
            ]}>
            <Text
              style={[
                styles.buttonText,
                focusedItem === PRESS && styles.buttonTextActive,
              ]}>
              {PRESS}
            </Text>
          </TouchableOpacity>
          <View style={styles.bottomBlock}>
            <Text style={styles.bottomText}>
              Looking for Apple TV+ for everyone?{' '}
            </Text>
            <TouchableOpacity
              ref={ref => (this.link = ref)}
              onFocus={this.handleItemFocus.bind(this, LINK)}>
              <Text
                style={[
                  styles.bottomText,
                  styles.link,
                  focusedItem === LINK && styles.linkActive,
                ]}>
                Watch on the Apple TV app.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({client}) => ({
  isFYCContent: client.isFYCContent,
});

const mapDispatchToProps = dispatch => ({
  changeClientReferer: data => {
    dispatch({
      type: CHANGE_CLIENT_REFERER,
      payload: data,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
