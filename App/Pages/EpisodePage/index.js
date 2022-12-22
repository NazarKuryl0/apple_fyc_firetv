import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {styles} from './styles';

class EpsiodePage extends React.Component {
  render() {
    return (
      <View>
        <Text>EpsiodePage</Text>
      </View>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EpsiodePage);
