import React from 'react';
import {View, TextInput, Alert, BackHandler} from 'react-native';
import {connect} from 'react-redux';

import {
  FETCH_FYC_USER,
  CLEAR_FETCH_FYC_USER_ERROR_MESSAGE,
} from '../../../Core/Store/User/Actions';
import {SWITCH_ENV_CODE} from '../../../Shared/Constants';
import {Colors} from '../../../Shared';
import Navigator from '../../../Core/Services/NavigationService';
import {styles} from './styles';

class FYCSignInPage extends React.Component {
  state = {
    code: '',
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
    this.setState({code: e});
  };

  handleSubmit = () => {
    const {code} = this.state;
    const {fetchFYCUser} = this.props;
    if (code === SWITCH_ENV_CODE) {
      Navigator.navigate('SwitchENVPage');
    } else {
      fetchFYCUser(code);
    }
  };

  handleCloseAlert = () => {
    const {clearFetchFYCErrorMessage} = this.props;
    clearFetchFYCErrorMessage();
    this.setState({code: ''});
    this.input.focus();
  };

  render() {
    const {code, isBackButtonPressed} = this.state;
    const {fetchUserErrorMessage} = this.props;
    return (
      <View style={styles.root}>
        {!!fetchUserErrorMessage && this.renderErrorModal()}
        <TextInput
          ref={ref => (this.input = ref)}
          style={styles.textInput}
          value={code}
          placeholder="Enter Code"
          placeholderTextColor={Colors.lightGray}
          onChangeText={this.handleChangeText}
          onEndEditing={!isBackButtonPressed && this.handleSubmit}
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
