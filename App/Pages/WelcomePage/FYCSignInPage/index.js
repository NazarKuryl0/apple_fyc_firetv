import React from 'react';
import {View, TextInput, Alert} from 'react-native';
import {connect} from 'react-redux';

import {
  FETCH_FYC_USER,
  CLEAR_FETCH_FYC_USER_ERROR_MESSAGE,
} from '../../../Core/Store/User/Actions';
import {styles} from './styles';

class FYCSignInPage extends React.Component {
  state = {
    code: '',
  };

  handleChangeText = e => {
    this.setState({code: e});
  };
  handleSubmit = () => {
    const {code} = this.state;
    const {fetchFYCUser} = this.props;
    fetchFYCUser(code);
  };
  handleCloseAlert = () => {
    const {clearFetchFYCErrorMessage} = this.props;
    clearFetchFYCErrorMessage();
  };
  render() {
    const {code} = this.state;
    const {fetchUserErrorMessage} = this.props;
    return (
      <View style={styles.root}>
        {fetchUserErrorMessage && this.renderErrorModal()}
        <TextInput
          autoFocus
          value={code}
          placeholder="Enter Code"
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
  fetchFYCUser: user => {
    dispatch({
      type: FETCH_FYC_USER,
      payload: user,
    });
  },
  clearFetchFYCErrorMessage: () => {
    dispatch({
      type: CLEAR_FETCH_FYC_USER_ERROR_MESSAGE,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FYCSignInPage);
