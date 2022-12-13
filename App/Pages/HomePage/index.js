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
  FAQ_FYC,
  FAQ_PRESS,
} from '../../Shared/Constants';
import {styles} from './styles';

const bannerURL = require('../../Assets/Images/Banner.png');

const centerHeaderItems = [ALL, CATEGORY, FAQ];

class HomePage extends React.Component {
  state = {
    focusedHeaderItem: ALL,
    isFocusedHeaderItem: true,
    focusedShow: undefined,
    focusedShowRef: undefined,
    isSetNativePropsForAllContent: false,
    isSetNativePropsForContentWithGenres: false,
    isSetNativePropsForFAQ: false,
    focusedGenre: undefined,
    focusedGenreRef: undefined,
    focusedShowInGenres: undefined,
    focusedShowInGenresRef: undefined,
    focusedFAQQItem: undefined,
    focusedFAQQItemRef: undefined,
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
      isSetNativePropsForFAQ,
    } = this.state;
    if (!isSetNativePropsForAllContent && this[`Show03`]) {
      this.setState({isSetNativePropsForAllContent: true});
      const {focusedShow, focusedShowRef} = this.state;
      if (!focusedShow) {
        this[ALL].setNativeProps({
          nextFocusDown: findNodeHandle(this[`Show00`]),
        });
      } else {
        this[ALL].setNativeProps({
          nextFocusDown: findNodeHandle(focusedShowRef),
        });
      }
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
    if (!isSetNativePropsForFAQ && this[`FAQ0`]) {
      const {focusedFAQQItemRef, focusedFAQQItem} = this.state;
      this.setState({isSetNativePropsForFAQ: true});
      if (!focusedFAQQItem) {
        this[FAQ].setNativeProps({
          nextFocusDown: findNodeHandle(this[`FAQ0`]),
        });
      } else {
        this[FAQ].setNativeProps({
          nextFocusDown: findNodeHandle(focusedFAQQItemRef),
        });
      }
    }
  }

  render() {
    const {focusedHeaderItem} = this.state;
    const {content, contentWithGenres, isFYCContent} = this.props;
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
        {focusedHeaderItem === FAQ &&
          this.renderFAQContent(isFYCContent ? FAQ_FYC : FAQ_PRESS)}
        {focusedHeaderItem !== CATEGORY && this.renderFooter()}
      </ScrollView>
    );
  }

  handleHeaderItemFocus = item => {
    this.setState({
      focusedHeaderItem: item,
      isFocusedHeaderItem: true,
    });
    if (item === ALL) {
      this.setState({
        isSetNativePropsForAllContent: false,
        focusedGenre: undefined,
        focusedGenreRef: undefined,
        focusedShowInGenres: undefined,
        focusedShowInGenresRef: undefined,
        focusedFAQQItem: undefined,
        focusedFAQQItemRef: undefined,
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
      this.setState({
        focusedShow: undefined,
        focusedShowRef: undefined,
        focusedFAQQItemRef: undefined,
        focusedFAQQItem: undefined,
      });
    } else {
      this.setState({
        focusedShow: undefined,
        focusedShowRef: undefined,
        isSetNativePropsForFAQ: false,
        focusedGenre: undefined,
        focusedGenreRef: undefined,
        focusedShowInGenres: undefined,
        focusedShowInGenresRef: undefined,
      });
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

  handleShowFocus = (item, ref) => {
    this.setState({
      focusedShow: item,
      isFocusedHeaderItem: false,
      focusedShowRef: ref,
    });
  };

  renderAllContent = content => {
    const {focusedShow, isFocusedHeaderItem} = this.state;
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
                    onFocus={this.handleShowFocus.bind(
                      this,
                      item.title_name,
                      this[`Show${categoryIndex}${itemIndex}`],
                    )}
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
                    {focusedShow === item.title_name &&
                      !isFocusedHeaderItem && (
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

  handleGenreFocus = (item, ref, isLastItem) => {
    this.setState({
      isFocusedHeaderItem: false,
      focusedGenre: item,
      focusedShowInGenres: undefined,
      focusedGenreRef: ref,
    });
    if (isLastItem) {
      this.mainScroll.scrollToEnd({animated: true});
    } else {
      this.mainScroll.scrollTo({y: 0, animated: true});
    }
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
            const isLastItem = index === contentWithGenres.length - 1;
            return (
              <TouchableOpacity
                ref={ref => (this[`Genre${index}`] = ref)}
                key={genre}
                onFocus={this.handleGenreFocus.bind(
                  this,
                  genre,
                  this[`Genre${index}`],
                  isLastItem,
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
          <View style={{marginTop: 50}}>{this.renderFooter()}</View>
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

  handleFAQItemFocus = (item, ref) => {
    this.setState({
      isFocusedHeaderItem: false,
      focusedFAQQItem: item,
      focusedFAQQItemRef: ref,
    });
  };

  renderFAQContent = content => {
    const {focusedFAQQItem, isFocusedHeaderItem} = this.state;
    return (
      <ScrollView
        horizontal
        fadingEdgeLength={100}
        showsHorizontalScrollIndicator={false}
        style={styles.faqBlock.mainBlock}>
        {content.map((item, index) => (
          <TouchableOpacity
            ref={ref => (this[`FAQ${index}`] = ref)}
            style={[
              styles.faqBlock.block,
              focusedFAQQItem === item.id &&
                !isFocusedHeaderItem &&
                styles.faqBlock.blockActive,
              index === content.length - 1 && styles.itemBlockWithoutMargin,
            ]}
            nextFocusUp={findNodeHandle(this[FAQ])}
            onFocus={this.handleFAQItemFocus.bind(
              this,
              item.id,
              this[`FAQ${index}`],
            )}>
            <Text accessible={false} style={styles.faqBlock.questionText}>
              {item.question}
            </Text>
            <Text accessible={false} style={styles.faqBlock.answerText}>
              {item.answer}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
