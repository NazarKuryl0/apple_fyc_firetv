import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {FETCH_HOME_PAGE_DATA} from '../../Core/Store/HomePage/Actions';

class HomePage extends React.Component {
  componentDidMount() {
    const {fetchHomePageData} = this.props;
    fetchHomePageData();
  }
  render() {
    return (
      <View>
        <Text>HOMEPAGE</Text>
      </View>
    );
  }
}

const mapStateToProps = ({home}) => ({
  data: home.data,
});

const mapDispatchToProps = dispatch => ({
  fetchHomePageData: () => {
    dispatch({
      type: FETCH_HOME_PAGE_DATA,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
