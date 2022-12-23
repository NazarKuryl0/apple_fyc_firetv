import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';

import {FETCH_HOME_PAGE_DATA} from '../../Core/Store/HomePage/Actions';
import {ALL} from '../../Shared/Constants';

import Header from './Header';
import AllContent from './AllContent';

class HomePage extends React.Component {
  state = {
    selectedHeaderItem: ALL,
    isFocusedHeaderItem: true,
  };

  componentDidMount() {
    const {fetchHomePageData} = this.props;
    fetchHomePageData();
  }

  handleHeaderItemPress = item => {
    this.setState({selectedHeaderItem: item});
  };

  changeIsFocusedHeaderItemValue = value => {
    this.setState({isFocusedHeaderItem: value});
  };

  render() {
    const {selectedHeaderItem, isFocusedHeaderItem} = this.state;
    const {isFYCContent, content} = this.props;
    return (
      <ScrollView style={{backgroundColor: 'black'}}>
        <Header
          isFYCContent={isFYCContent}
          isFocusedHeaderItem={isFocusedHeaderItem}
          selectedHeaderItem={selectedHeaderItem}
          onPress={this.handleHeaderItemPress}
          changeIsFocusedHeaderItemValue={this.changeIsFocusedHeaderItemValue}
        />
        {selectedHeaderItem === ALL && !!content?.length && (
          <AllContent
            content={content}
            isFocusedHeaderItem={isFocusedHeaderItem}
            changeIsFocusedHeaderItemValue={this.changeIsFocusedHeaderItemValue}
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
