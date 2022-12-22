import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  findNodeHandle,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import {connect} from 'react-redux';

import FYCLogo from '../../Assets/Images/FYCLogo';
import {
  FETCH_HOME_PAGE_DATA,
  SET_NEED_UPDATE_HOME_PAGE_DATA_TO_FALSE,
} from '../../Core/Store/HomePage/Actions';
import {
  FETCH_SHOW_DATA,
  SET_SHOW_BANNER,
  CLEAR_SHOW_EPISODES,
} from '../../Core/Store/ShowPage/Actions';
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
  ANIMATION_DURATION,
} from '../../Shared/Constants';
import {styles} from './styles';

const bannerURL = require('../../Assets/Images/Banner.png');

const centerHeaderItems = [ALL, CATEGORY, FAQ];

class HomePage extends React.Component {
  state = {
    focusedHeaderItem: ALL,
    isFocusedHeaderItem: true,
    scaleValue: new Animated.Value(0),
    focusedShow: undefined,
    focusedShowRef: undefined,
    isSetNativePropsForAllContent: false,
    isSetNativePropsForContentWithGenres: false,
    isSetNativePropsForFAQ: false,
    isSetNativePropsForSignOut: false,
    focusedGenre: undefined,
    focusedGenreRef: undefined,
    focusedShowInGenres: undefined,
    focusedShowInGenresRef: undefined,
    focusedFAQQItem: undefined,
    focusedFAQQItemRef: undefined,
  };

  componentDidMount() {
    const {fetchHomePageData, clearShowEpisodes, content} = this.props;
    clearShowEpisodes();
    if (!content || !content.length) {
      fetchHomePageData();
    }
    this[ALL].setNativeProps({
      nextFocusLeft: findNodeHandle(this[ALL]),
    });
  }

  componentDidUpdate() {
    const {
      isSetNativePropsForAllContent,
      isSetNativePropsForContentWithGenres,
      isSetNativePropsForFAQ,
      isSetNativePropsForSignOut,
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
    if (!isSetNativePropsForSignOut && this[`FAQ0`]) {
      const {focusedFAQQItemRef} = this.state;
      this.setState({isSetNativePropsForSignOut: true});
      if (focusedFAQQItemRef) {
        this[SIGN_OUT].setNativeProps({
          nextFocusDown: findNodeHandle(focusedFAQQItemRef),
        });
      } else {
        this[SIGN_OUT].setNativeProps({
          nextFocusDown: findNodeHandle(this[`FAQ0`]),
        });
      }
      this[SIGN_OUT].setNativeProps({
        nextFocusRight: findNodeHandle(this[SIGN_OUT]),
      });
    }
  }

  render() {
    const {focusedHeaderItem} = this.state;
    const {content, contentWithGenres, isFYCContent} = this.props;
    return (
      <ScrollView
        ref={ref => (this.mainScroll = ref)}
        showsVerticalScrollIndicator={false}
        style={styles.root}
        fadingEdgeLength={100}>
        {this.renderHeader()}
        {focusedHeaderItem === ALL && content && this.renderAllContent(content)}
        {focusedHeaderItem === CATEGORY &&
          contentWithGenres &&
          this.renderContentWithGenres(contentWithGenres)}
        {(focusedHeaderItem === FAQ || focusedHeaderItem === SIGN_OUT) &&
          this.renderFAQContent(isFYCContent ? FAQ_FYC : FAQ_PRESS)}
        {this.renderFooter()}
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
        isSetNativePropsForFAQ: false,
        isSetNativePropsForSignOut: false,
        focusedShow: undefined,
        focusedShowRef: undefined,
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
                activeOpacity={1}
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
          activeOpacity={1}
          ref={ref => (this[SIGN_OUT] = ref)}
          style={[
            styles.headerBlockItem,
            focusedHeaderItem === SIGN_OUT &&
              isFocusedHeaderItem &&
              styles.headerBlockItemActive,
          ]}
          onFocus={this.handleHeaderItemFocus.bind(this, SIGN_OUT)}>
          <Text
            accessible={false}
            style={[
              styles.headerBlockText,
              focusedHeaderItem === SIGN_OUT &&
                isFocusedHeaderItem &&
                styles.headerBlockTextActive,
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

  handleBlur = () => {
    const {scaleValue} = this.state;
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  handleShowFocus = (item, ref) => {
    const {scaleValue} = this.state;
    this.setState({
      focusedShow: item,
      isFocusedHeaderItem: false,
      focusedShowRef: ref,
    });
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  handleShowPress = (slug, showBackground) => {
    const {fetchShowData, setShowBanner} =
      this.props;
    setShowBanner(showBackground);
    fetchShowData(slug, showBackground);
  };

  renderItem = ({item, index}, categoryIndex) => {
    const {focusedShow, isFocusedHeaderItem} = this.state;
    const {showSlug} = this.props;
    const {scaleValue} = this.state;
    const cardScale = scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.05],
    });
    let transformStyle = {transform: [{scale: cardScale}]};
    return (
      <TouchableOpacity
        activeOpacity={1}
        ref={ref => (this[`Show${categoryIndex}${index}`] = ref)}
        hasTVPreferredFocus={item.slug === showSlug}
        onFocus={this.handleShowFocus.bind(
          this,
          item.title_name,
          this[`Show${categoryIndex}${index}`],
        )}
        onBlur={this.handleBlur}
        onPress={this.handleShowPress.bind(this, item.slug, item.images.image)}
        style={[
          styles.allContent.itemBlock,
          index % 4 === 3 && styles.itemBlockWithoutMargin,
        ]}>
        <Animated.Image
          resizeMode="contain"
          source={{
            uri: `${item.images.thumb}${styles.allContent.itemBlock.width}`,
          }}
          style={[
            styles.allContent.itemImage,
            focusedShow === item.title_name && transformStyle,
          ]}
        />
        {focusedShow === item.title_name && !isFocusedHeaderItem && (
          <Text
            numberOfLines={2}
            accessible={false}
            style={styles.allContent.itemText}>
            {item.title_name}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  renderAllContent = content => {
    return (
      <View>
        <Image
          accessible={false}
          source={bannerURL}
          style={styles.banner}
          resizeMode="center"
        />
        {content.map((category, categoryIndex) => (
          <View key={category.name}>
            <Text accessible={false} style={styles.allContent.headerText}>
              {category.name}
            </Text>
            <FlatList
              data={category.content}
              numColumns={4}
              initialNumToRender={2}
              contentContainerStyle={styles.allContent.categoryBlock}
              renderItem={e => this.renderItem(e, categoryIndex)}
            />
          </View>
        ))}
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
    const {scaleValue} = this.state;
    this.setState({
      focusedShowInGenres: item,
      focusedShowInGenresRef: ref,
      isFocusedHeaderItem: false,
    });
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
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
    const {scaleValue} = this.state;
    const cardScale = scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.05],
    });
    let transformStyle = {transform: [{scale: cardScale}]};
    return (
      <View style={styles.genresBlock.mainBlock}>
        <View style={styles.genresBlock.genresBlock}>
          {contentWithGenres.map((item, index) => {
            const genre = item.genre;
            const isLastItem = index > contentWithGenres.length - 5;
            return (
              <TouchableOpacity
                activeOpacity={1}
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
        </View>
        <View style={styles.genresBlock.showsBlock}>
          {showsToDisplay.map((show, showIndex) => {
            const showName = show.title_name;
            const showSlug = show.slug;
            const showBanner = show.images.image;
            const indexForNextFocusLeft = !(showIndex % 3);
            const showsLength = showsToDisplay.length;
            const indexForNextFocusRight =
              showsLength > 2
                ? showIndex % 3 === 2
                  ? showIndex
                  : showIndex + 1
                : showsLength - 1;
            const needForNextFocusDown = showsLength < 3;
            const indexForNextFocusDown = showsLength - 1;
            const needForNextFocusUp = showIndex < 3;
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={showName}
                ref={ref => (this[`ShowInGenres${showIndex}`] = ref)}
                nextFocusLeft={
                  indexForNextFocusLeft && findNodeHandle(focusedGenreRef)
                }
                nextFocusRight={findNodeHandle(
                  this[`ShowInGenres${indexForNextFocusRight}`],
                )}
                nextFocusDown={
                  showIndex === showsLength - 1
                    ? findNodeHandle(this[`ShowInGenres${showIndex}`])
                    : needForNextFocusDown &&
                      findNodeHandle(
                        this[`ShowInGenres${indexForNextFocusDown}`],
                      )
                }
                nextFocusUp={
                  needForNextFocusUp && findNodeHandle(this[CATEGORY])
                }
                onBlur={this.handleBlur}
                onFocus={this.handleShowFocusInGenres.bind(
                  this,
                  showName,
                  this[`ShowInGenres${showIndex}`],
                )}
                onPress={this.handleShowPress.bind(this, showSlug, showBanner)}
                style={[
                  styles.genresBlock.showBlock,
                  showIndex % 3 === 2 && styles.itemBlockWithoutMargin,
                ]}>
                <Animated.Image
                  resizeMode="contain"
                  source={{
                    uri: show.images.thumb,
                  }}
                  style={[
                    styles.genresBlock.showImage,
                    focusedShowInGenres === showName && transformStyle,
                  ]}
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
            activeOpacity={1}
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

const mapStateToProps = ({home, client, show}) => ({
  content: home.content,
  contentWithGenres: home.contentWithGenres,
  showSlug: show.showData?.showSlug,
  isFYCContent: client.isFYCContent,
});

const mapDispatchToProps = dispatch => ({
  fetchHomePageData: () => {
    dispatch({
      type: FETCH_HOME_PAGE_DATA,
    });
  },
  fetchShowData: (showSlug, showBackground) => {
    dispatch({
      type: FETCH_SHOW_DATA,
      payload: {
        showSlug,
        showBackground,
      },
    });
  },
  clearShowEpisodes: () => {
    dispatch({
      type: CLEAR_SHOW_EPISODES,
    });
  },
  setShowBanner: value => {
    dispatch({
      type: SET_SHOW_BANNER,
      payload: value,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
