import React from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import NavigationService from '../Core/Services/NavigationService';

import {ADD_USER} from '../Core/Store/User/Actions';

class Todo extends React.Component {
  componentDidMount() {
    NavigationService.push('Test1');
  }
  state = {
    focusedItem: 'ADD',
  };
  handlePress = item => {
    if (item === 'ADD') {
      this.props.addUser('NAZAR');
    } else {
      NavigationService.navigate('Test2');
    }
  };
  handleFocus = item => {
    this.setState({focusedItem: item});
  };
  render() {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onFocus={this.handleFocus.bind(this, 'ADD')}
          onPress={this.handlePress.bind(this, 'ADD')}
          style={[
            {
              width: 400,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'green',
            },
            this.state.focusedItem === 'ADD' && {
              opacity: 0.5,
            },
          ]}>
          <Text>ADD</Text>
        </TouchableOpacity>
        {this.props.users && <Text>{this.props.users}</Text>}
        <TouchableOpacity
          onFocus={this.handleFocus.bind(this, 'NAVIGATE')}
          onPress={this.handlePress.bind(this, 'NAVIGATE')}
          style={[
            {
              width: 400,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'green',
            },
            this.state.focusedItem === 'NAVIGATE' && {
              opacity: 0.5,
            },
          ]}>
          <Text>NAVIGATE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({user}) => ({
  users: user.users,
});

const mapDispatchToProps = dispatch => ({
  addUser: user => {
    dispatch({
      type: ADD_USER,
      payload: user,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
