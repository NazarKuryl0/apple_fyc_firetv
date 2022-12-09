import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import FYCLogo from '../../Assets/Icons/FYCLogo';
import {FETCH_HOME_PAGE_DATA} from '../../Core/Store/HomePage/Actions';
import {PRESS} from '../../Shared/Constants';
import {styles} from './styles';

class HomePage extends React.Component {
  componentDidMount() {
    const {fetchHomePageData} = this.props;
    fetchHomePageData();
  }
  render() {
    const {content} = this.props;
    return <View style={styles.root}>{this.renderHeader()}</View>;
  }

  renderHeader = () => {
    const {isFYCContent} = this.props;
    return (
      <View style={styles.headerBlock}>
        {isFYCContent ? <FYCLogo /> : <Text>{PRESS}</Text>}
      </View>
    );
  };
}

const mapStateToProps = ({home, client}) => ({
  content: home.content,
  isFYCContent: client.isFYCContent,
});

const mapDispatchToProps = dispatch => ({
  fetchHomePageData: () => {
    dispatch({
      type: FETCH_HOME_PAGE_DATA,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
