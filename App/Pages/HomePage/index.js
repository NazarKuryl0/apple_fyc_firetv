import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';

import {FETCH_HOME_PAGE_DATA} from '../../Core/Store/HomePage/Actions';
import {ALL} from '../../Shared/Constants';

import Header from './Header';
import AllContent from './AllContent';

import {styles} from './styles';

class HomePage extends React.Component {
  state = {
    selectedHeaderItem: ALL,
    selectedHeaderItemRef: null,
    focusedShow: null,
  };

  componentDidMount() {
    const {fetchHomePageData} = this.props;
    fetchHomePageData();
  }

  handleHeaderItemPress = item => {
    this.setState({selectedHeaderItem: item});
  };

  changeFocusedShow = value => {
    this.setState({focusedShow: value});
  };

  changeSelectedHeaderItemRef = value => {
    this.setState({selectedHeaderItemRef: value});
  };

  render() {
    const {
      selectedHeaderItem,
      isFocusedHeaderItem,
      focusedShow,
      selectedHeaderItemRef,
    } = this.state;
    const {isFYCContent, content} = this.props;
    return (
      <ScrollView
        style={styles.root}
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={100}>
        <Header
          isFYCContent={isFYCContent}
          isFocusedHeaderItem={isFocusedHeaderItem}
          selectedHeaderItem={selectedHeaderItem}
          focusedShow={focusedShow}
          handleHeaderItemPress={this.handleHeaderItemPress}
          changeFocusedShow={this.changeFocusedShow}
          changeSelectedHeaderItemRef={this.changeSelectedHeaderItemRef}
        />
        {selectedHeaderItem === ALL && !!content?.length && (
          <AllContent
            content={content}
            selectedHeaderItemRef={selectedHeaderItemRef}
            focusedShow={focusedShow}
            isFocusedHeaderItem={isFocusedHeaderItem}
            changeFocusedShow={this.changeFocusedShow}
          />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({client, home}) => ({
  isFYCContent: client.isFYCContent,
  content: home.content,
});

const mapDispatchToProps = dispatch => ({
  fetchHomePageData: () => {
    dispatch({
      type: FETCH_HOME_PAGE_DATA,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
