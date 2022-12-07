import React from 'react';
import {TextInput, Alert, View} from 'react-native';
import {validate} from 'email-validator';

import {SWITCH_ENV_CODE} from '../../../Shared/Constants';
import Navigator from '../../../Core/Services/NavigationService';
import {styles} from './styles';

export default class PRESSSignInEmailPage extends React.Component {
  state = {
    email: '',
    errorMessage: null,
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
  };

  render() {
    const {email, errorMessage} = this.state;
    return (
      <View style={styles.root}>
        {errorMessage && this.renderErrorModal()}
        <TextInput
          placeholder="Email Sign In Requested"
          autoFocus
          keyboardType="email-address"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmit}
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
