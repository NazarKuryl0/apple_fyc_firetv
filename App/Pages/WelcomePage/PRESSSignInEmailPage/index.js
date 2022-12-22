import React from 'react';
import {TextInput, Alert, View, BackHandler} from 'react-native';
import {validate} from 'email-validator';

import {SWITCH_ENV_CODE} from '../../../Shared/Constants';
import Navigator from '../../../Core/Services/NavigationService';
import {Colors} from '../../../Shared';

import {styles} from './styles';

export default class PRESSSignInEmailPage extends React.Component {
  state = {
    email: '',
    errorMessage: null,
    isBackButtonPressed: false,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
    setTimeout(() => {
      this.input.focus();
    }, 1000);
  }

  navigateBack = () => {
    this.setState({isBackButtonPressed: true});
  };

  handleChangeText = e => {
    this.setState({email: e});
  };

  handleSubmit = () => {
    const {email} = this.state;
    if (email === SWITCH_ENV_CODE) {
      Navigator.navigate('SwitchENVPage');
    } else if (!email || !validate(email)) {
      this.setState({
        email: '',
        errorMessage: 'Try again or contact screeners@apple.com',
      });
    } else {
      Navigator.navigate('PRESSSignInPasswordPage', {email});
    }
  };

  handleCloseAlert = () => {
    this.setState({errorMessage: null});
    this.input.focus();
  };

  render() {
    const {email, errorMessage, isBackButtonPressed} = this.state;
    return (
      <View style={styles.root}>
        {!!errorMessage && this.renderErrorModal()}
        <TextInput
          ref={ref => (this.input = ref)}
          placeholder="Email Sign In Requested"
          style={styles.textInput}
          placeholderTextColor={Colors.lightGray}
          keyboardType="email-address"
          onChangeText={this.handleChangeText}
          onEndEditing={!isBackButtonPressed && this.handleSubmit}
          value={email}
        />
      </View>
    );
  }

  renderErrorModal = () => {
    const {errorMessage} = this.state;
    Alert.alert(errorMessage, '', [
      {
        text: 'OK',
        onPress: this.handleCloseAlert,
      },
    ]);
  };
}
