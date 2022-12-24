import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';

import {FETCH_HOME_PAGE_DATA} from '../../Core/Store/HomePage/Actions';
import {ALL, CATEGORY} from '../../Shared/Constants';

import Header from './Header';
import AllContent from './AllContent';
import CategoriesContent from './CategoriesContent';

import {styles} from './styles';

class HomePage extends React.Component {
  state = {
    selectedHeaderItem: ALL,
    selectedHeaderItemRef: null,
    focusedGenreRef: null,
    isFocusedHeaderItem: true,
    focusedShow: null,
  };

  componentDidMount() {
    const {fetchHomePageData} = this.props;
    fetchHomePageData();
  }

  handleHeaderItemPress = (item, ref) => {
    this.setState({selectedHeaderItem: item, selectedHeaderItemRef: ref});
  };

  changeFocusedShow = value => {
    this.setState({focusedShow: value});
  };

  changeSelectedHeaderItemRef = value => {
    this.setState({selectedHeaderItemRef: value});
  };

  changeIsFocusedHeaderItemValue = value => {
    this.setState({isFocusedHeaderItem: value});
  };

  changeFocusedGenreRef = ref => {
    this.setState({focusedGenreRef: ref});
  };

  render() {
    const {
      selectedHeaderItem,
      isFocusedHeaderItem,
      focusedShow,
      focusedGenreRef,
      selectedHeaderItemRef,
    } = this.state;
    const {isFYCContent, content, contentWithGenres} = this.props;
    return (
      <ScrollView
        style={styles.root}
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={100}>
        <Header
          isFYCContent={isFYCContent}
          isFocusedHeaderItem={isFocusedHeaderItem}
          selectedHeaderItem={selectedHeaderItem}
          focusedGenreRef={focusedGenreRef}
          handleHeaderItemPress={this.handleHeaderItemPress}
          changeFocusedShow={this.changeFocusedShow}
          changeSelectedHeaderItemRef={this.changeSelectedHeaderItemRef}
          changeIsFocusedHeaderItemValue={this.changeIsFocusedHeaderItemValue}
        />
        {selectedHeaderItem === ALL && !!content?.length && (
          <AllContent
            content={content}
            selectedHeaderItemRef={selectedHeaderItemRef}
            focusedShow={focusedShow}
            changeFocusedShow={this.changeFocusedShow}
            changeIsFocusedHeaderItemValue={this.changeIsFocusedHeaderItemValue}
          />
        )}
        {selectedHeaderItem === CATEGORY && !!contentWithGenres?.length && (
          <CategoriesContent
            contentWithGenres={contentWithGenres}
            isFocusedHeaderItem={isFocusedHeaderItem}
            selectedHeaderItemRef={selectedHeaderItemRef}
            focusedGenreRef={focusedGenreRef}
            changeIsFocusedHeaderItemValue={this.changeIsFocusedHeaderItemValue}
            changeFocusedGenreRef={this.changeFocusedGenreRef}
          />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({client, home}) => ({
  isFYCContent: client.isFYCContent,
  content: home.content,
  contentWithGenres: home.contentWithGenres,
});

const mapDispatchToProps = dispatch => ({
  fetchHomePageData: () => {
    dispatch({
      type: FETCH_HOME_PAGE_DATA,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
