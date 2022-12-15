import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {styles} from './styles';

class ShowPage extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        <Text>HELLO</Text>
      </View>
    );
  }
}

const mapStateToProps = ({show}) => ({
  showData: show.showData,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
