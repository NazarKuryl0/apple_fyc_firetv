import React from 'react';
import {TextInput, View, Alert} from 'react-native';
import {connect} from 'react-redux';

import Navigator from '../../../Core/Services/NavigationService';
import {
  FETCH_PRESS_USER,
  CLEAR_FETCH_FYC_USER_ERROR_MESSAGE,
} from '../../../Core/Store/User/Actions';
import {Colors} from '../../../Shared';

import {styles} from './styles';

class PRESSSignInPasswordPage extends React.Component {
  state = {
    password: '',
  };

  handleChangeText = e => {
    this.setState({password: e});
  };

  handleSubmit = () => {
    const {email} = this.props.navigation.state.params;
    const {password} = this.state;
    const {fetchPRESSUser} = this.props;
    fetchPRESSUser(email, password);
  };

  handleCloseAlert = () => {
    const {clearFetchFYCErrorMessage} = this.props;
    clearFetchFYCErrorMessage();
    Navigator.navigate('PRESSSignInEmailPage');
  };

  render() {
    const {password} = this.state;
    const {fetchUserErrorMessage} = this.props;
    return (
      <View style={styles.root}>
        {!!fetchUserErrorMessage && this.renderErrorModal()}
        <TextInput
          autoFocus
          value={password}
          placeholder="Password Requested"
          placeholderTextColor={Colors.lightGray}
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmit}
        />
      </View>
    );
  }

  renderErrorModal = () => {
    const {fetchUserErrorMessage} = this.props;
    Alert.alert(fetchUserErrorMessage, '', [
      {
        text: 'OK',
        onPress: this.handleCloseAlert,
      },
    ]);
  };
}

const mapStateToProps = ({user}) => ({
  fetchUserErrorMessage: user.fetchUserErrorMessage,
});

const mapDispatchToProps = dispatch => ({
  fetchPRESSUser: (email, password) => {
    dispatch({
      type: FETCH_PRESS_USER,
      payload: {
        email,
        password,
      },
    });
  },
  clearFetchFYCErrorMessage: () => {
    dispatch({
      type: CLEAR_FETCH_FYC_USER_ERROR_MESSAGE,
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PRESSSignInPasswordPage);
