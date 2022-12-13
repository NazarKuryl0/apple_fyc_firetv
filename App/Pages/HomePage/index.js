import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  findNodeHandle,
} from 'react-native';
import {connect} from 'react-redux';

import FYCLogo from '../../Assets/Images/FYCLogo';
import {FETCH_HOME_PAGE_DATA} from '../../Core/Store/HomePage/Actions';
import {
  PRESS,
  ALL,
  CATEGORY,
  FAQ,
  SIGN_OUT,
  ALL_RIGHTS_RESERVER,
  POWERED_BY,
} from '../../Shared/Constants';
import {styles} from './styles';

const bannerURL = require('../../Assets/Images/Banner.png');

const centerHeaderItems = [ALL, CATEGORY, FAQ];

class HomePage extends React.Component {
  state = {
    focusedHeaderItem: ALL,
    isFocusedHeaderItem: true,
    focusedShow: undefined,
    isSetNativePropsForAllContent: false,
    isSetNativePropsForContentWithGenres: false,
    focusedGenre: undefined,
    focusedGenreRef: undefined,
    focusedShowInGenres: undefined,
    focusedShowInGenresRef: undefined,
  };

  componentDidMount() {
    const {fetchHomePageData} = this.props;
    fetchHomePageData();
    this[ALL].setNativeProps({
      nextFocusLeft: findNodeHandle(this[ALL]),
    });
  }

  componentDidUpdate() {
    const {
      isSetNativePropsForAllContent,
      isSetNativePropsForContentWithGenres,
    } = this.state;
    if (!isSetNativePropsForAllContent && this[`Show03`]) {
      this.setState({isSetNativePropsForAllContent: true});
      this[`Show03`].setNativeProps({
        nextFocusUp: findNodeHandle(this[ALL]),
      });
      this[`Show02`].setNativeProps({
        nextFocusUp: findNodeHandle(this[ALL]),
      });
    }
    if (!isSetNativePropsForContentWithGenres && this[`Genre0`]) {
      this.setState({isSetNativePropsForContentWithGenres: true});
      this[`Genre0`].setNativeProps({
        nextFocusUp: findNodeHandle(this[CATEGORY]),
      });
      this[CATEGORY].setNativeProps({
        nextFocusDown: findNodeHandle(this[`Genre0`]),
      });
    }
  }

  render() {
    const {focusedHeaderItem} = this.state;
    const {content, contentWithGenres} = this.props;
    return (
      <ScrollView
        ref={ref => (this.mainScroll = ref)}
        style={styles.root}
        fadingEdgeLength={100}>
        {this.renderHeader()}
        {focusedHeaderItem === ALL && content && this.renderAllContent(content)}
        {focusedHeaderItem === CATEGORY &&
          contentWithGenres &&
          this.renderContentWithGenres(contentWithGenres)}
        {this.renderFooter()}
      </ScrollView>
    );
  }

  handleHeaderItemFocus = item => {
    this.setState({
      focusedHeaderItem: item,
      focusedShow: undefined,
      isFocusedHeaderItem: true,
    });
    if (item === ALL) {
      this.setState({
        isSetNativePropsForAllContent: false,
        focusedGenre: undefined,
        focusedGenreRef: undefined,
        focusedShowInGenres: undefined,
        focusedShowInGenresRef: undefined,
      });
    } else if (item === CATEGORY) {
      const {focusedShowInGenresRef, focusedShowInGenres} = this.state;
      if (focusedShowInGenresRef && focusedShowInGenres) {
        this[CATEGORY].setNativeProps({
          nextFocusDown: findNodeHandle(focusedShowInGenresRef),
        });
      } else {
        this.setState({isSetNativePropsForContentWithGenres: false});
      }
    }
  };

  renderHeader = () => {
    const {focusedHeaderItem, isFocusedHeaderItem} = this.state;
    const {isFYCContent} = this.props;
    return (
      <View style={styles.headerBlock}>
        {isFYCContent ? <FYCLogo /> : <Text accessible={false}>{PRESS}</Text>}

        <View style={styles.headerCenterBlock}>
          {centerHeaderItems.map(item => {
            return (
              <TouchableOpacity
                key={item}
                ref={ref => (this[item] = ref)}
                hasTVPreferredFocus={item === ALL}
                style={[
                  styles.headerBlockItem,
                  focusedHeaderItem === item &&
                    isFocusedHeaderItem &&
                    styles.headerBlockItemActive,
                  focusedHeaderItem === item &&
                    !isFocusedHeaderItem &&
                    styles.headerBlockItemActiveSection,
                ]}
                onFocus={this.handleHeaderItemFocus.bind(this, item)}>
                <Text
                  accessible={false}
                  style={[
                    styles.headerBlockText,
                    focusedHeaderItem === item &&
                      isFocusedHeaderItem &&
                      styles.headerBlockTextActive,
                    focusedHeaderItem === item &&
                      !isFocusedHeaderItem &&
                      styles.headerBlockTextActiveSection,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            styles.headerBlockItem,
            focusedHeaderItem === SIGN_OUT && styles.headerBlockItemActive,
          ]}
          onFocus={this.handleHeaderItemFocus.bind(this, SIGN_OUT)}>
          <Text
            accessible={false}
            style={[
              styles.headerBlockText,
              focusedHeaderItem === SIGN_OUT && styles.headerBlockTextActive,
            ]}>
            {SIGN_OUT}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderFooter = () => {
    return (
      <View style={styles.footerBlock}>
        <Text accessible={false} style={styles.footerText}>
          {ALL_RIGHTS_RESERVER}
        </Text>
        <Text accessible={false} style={styles.footerTextPoweredBy}>
          {POWERED_BY}
        </Text>
      </View>
    );
  };

  handleShowFocus = item => {
    this.setState({focusedShow: item, isFocusedHeaderItem: false});
  };

  renderAllContent = content => {
    const {focusedShow} = this.state;
    return (
      <View>
        <Image accessible={false} source={bannerURL} resizeMode="center" />
        {content.map((category, categoryIndex) => {
          const categoryName = category.name;
          return (
            <View key={categoryName}>
              <Text accessible={false} style={styles.allContent.headerText}>
                {categoryName}
              </Text>
              <View style={styles.allContent.categoryBlock}>
                {category.content.map((item, itemIndex) => (
                  <TouchableOpacity
                    ref={ref =>
                      (this[`Show${categoryIndex}${itemIndex}`] = ref)
                    }
                    key={item.title_name}
                    onFocus={this.handleShowFocus.bind(this, item.title_name)}
                    style={[
                      styles.allContent.itemBlock,
                      itemIndex % 4 === 3 && styles.itemBlockWithoutMargin,
                    ]}>
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: item.images.thumb,
                      }}
                      style={[styles.allContent.itemImage]}
                    />
                    {focusedShow === item.title_name && (
                      <Text
                        numberOfLines={2}
                        accessible={false}
                        style={styles.allContent.itemText}>
                        {item.title_name}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  handleGenreFocus = (item, ref) => {
    this.setState({
      isFocusedHeaderItem: false,
      focusedGenre: item,
      focusedShowInGenres: undefined,
      focusedGenreRef: ref,
    });
    this.mainScroll.scrollTo({y: 0, animated: true});
  };

  handleShowFocusInGenres = (item, ref) => {
    this.setState({
      focusedShowInGenres: item,
      focusedShowInGenresRef: ref,
      isFocusedHeaderItem: false,
    });
  };

  renderContentWithGenres = contentWithGenres => {
    const {
      focusedGenre,
      focusedShowInGenres,
      focusedGenreRef,
      isFocusedHeaderItem,
    } = this.state;
    const showsToDisplay = !focusedGenre
      ? contentWithGenres[0].content
      : contentWithGenres.filter(item => item.genre === focusedGenre)[0]
          .content;
    return (
      <View style={styles.genresBlock.mainBlock}>
        <View style={styles.genresBlock.genresBlock}>
          {contentWithGenres.map((item, index) => {
            const genre = item.genre;
            return (
              <TouchableOpacity
                ref={ref => (this[`Genre${index}`] = ref)}
                key={genre}
                onFocus={this.handleGenreFocus.bind(
                  this,
                  genre,
                  this[`Genre${index}`],
                )}
                style={[
                  styles.genresBlock.genreBlock,
                  focusedGenre === genre &&
                    !isFocusedHeaderItem &&
                    styles.genresBlock.genreBlockActive,
                  focusedGenre === genre &&
                    focusedShowInGenres &&
                    styles.genresBlock.genreBlockActiveSection,
                ]}>
                <Text
                  accessible={false}
                  style={[
                    styles.genresBlock.genreText,
                    focusedGenre === genre &&
                      !isFocusedHeaderItem &&
                      styles.genresBlock.genreTextActive,
                    focusedGenre === genre &&
                      focusedShowInGenres &&
                      styles.genresBlock.genreText,
                  ]}>
                  {genre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.genresBlock.showsBlock}>
          {showsToDisplay.map((show, showIndex) => {
            const showName = show.title_name;
            const indexForNextFocusLeft = !(showIndex % 3);
            const indexForNextFocusRight =
              showsToDisplay.length > 2
                ? showIndex % 3 === 2
                : showsToDisplay.length;
            const needForNextFocusDown =
              showIndex === showsToDisplay.length - 1;
            const indexForNextFocusDown = showsToDisplay.length - 1;
            const needForNextFocusUp = showIndex < 3;
            return (
              <TouchableOpacity
                key={showName}
                ref={ref => (this[`ShowInGenres${showIndex}`] = ref)}
                nextFocusLeft={
                  indexForNextFocusLeft && findNodeHandle(focusedGenreRef)
                }
                nextFocusRight={
                  indexForNextFocusRight &&
                  findNodeHandle(this[`ShowInGenres${showIndex}`])
                }
                nextFocusDown={
                  needForNextFocusDown &&
                  findNodeHandle(this[`ShowInGenres${indexForNextFocusDown}`])
                }
                nextFocusUp={
                  needForNextFocusUp && findNodeHandle(this[CATEGORY])
                }
                onFocus={this.handleShowFocusInGenres.bind(
                  this,
                  showName,
                  this[`ShowInGenres${showIndex}`],
                )}
                style={[
                  styles.genresBlock.showBlock,
                  showIndex % 3 === 2 && styles.itemBlockWithoutMargin,
                ]}>
                <Image
                  resizeMode="contain"
                  source={{
                    uri: show.images.thumb,
                  }}
                  style={styles.genresBlock.showImage}
                />
                {focusedShowInGenres === showName && !isFocusedHeaderItem && (
                  <Text style={styles.genresBlock.showName} accessible={false}>
                    {showName}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
}

const mapStateToProps = ({home, client}) => ({
  content: home.content,
  contentWithGenres: home.contentWithGenres,
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
