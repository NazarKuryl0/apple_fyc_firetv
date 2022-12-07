import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';

import {INT, PROD, UAT} from '../../../Shared/Constants';
import client from '../../../Core/Services/client';
import {CHANGE_CLIENT_ENV} from '../../../Core/Store/Client/Actions';
import ButtonOn from '../../../Assets/Icons/radioOnButton.svg';
import ButtonOff from '../../../Assets/Icons/radioOffButton.svg';
import {styles} from './styles';

class SwitchENVPage extends React.Component {
  state = {
    focusedItem: this.props.env,
  };

  componentWillUnmount() {
    const {focusedItem} = this.state;
    const {changeClientENV} = this.props;
    changeClientENV(focusedItem);
  }

  handleItemFocus = item => {
    this.setState({focusedItem: item});
  };

  render() {
    return (
      <View style={styles.root}>
        {this.renderButton(INT)}
        {this.renderButton(PROD)}
        {this.renderButton(UAT)}
      </View>
    );
  }

  renderButton = item => {
    const {focusedItem} = this.state;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        hasTVPreferredFocus={focusedItem === item}
        onFocus={this.handleItemFocus.bind(this, item)}
        style={styles.itemBlock}>
        {focusedItem === item ? <ButtonOn /> : <ButtonOff />}
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    );
  };
}

const mapStateToProps = ({client}) => ({
  env: client.env,
});

const mapDispatchToProps = dispatch => ({
  changeClientENV: data => {
    dispatch({
      type: CHANGE_CLIENT_ENV,
      payload: data,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SwitchENVPage);
