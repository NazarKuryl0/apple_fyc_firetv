import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  findNodeHandle,
  Animated,
  Easing,
} from 'react-native';

import {ANIMATION_DURATION, SCALE_VALUE} from '../../../Shared/Constants';

import {styles} from './styles';

export default class CategoriesComponent extends React.Component {
  state = {
    focusedGenre: null,
    isFocusedGenre: false,
    focusedShow: null,
    isFocusedShow: false,
  };

  componentDidMount() {
    const {changeFocusedGenreRef} = this.props;
    changeFocusedGenreRef(this['Genre0']);
  }

  handleGenreFocus = (value, ref) => {
    const {changeIsFocusedHeaderItemValue, changeFocusedGenreRef} = this.props;
    this.setState({
      focusedGenre: value,
      isFocusedGenre: true,
      isFocusedShow: false,
    });
    changeFocusedGenreRef(ref);
    changeIsFocusedHeaderItemValue(false);
  };

  handleShowFocus = value => {
    const {changeIsFocusedHeaderItemValue} = this.props;
    this.setState({
      isFocusedShow: true,
      isFocusedGenre: false,
      focusedShow: value,
    });
    changeIsFocusedHeaderItemValue(false);
    Animated.timing(SCALE_VALUE, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  handleBlur = () => {
    Animated.timing(SCALE_VALUE, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  handleShowPress = (slug, background) => {
    const {fetchShowData, setShowBanner} = this.props;
    setShowBanner(background);
    fetchShowData(slug, background);
  };

  render() {
    const {isFocusedGenre, focusedGenre, isFocusedShow, focusedShow} =
      this.state;
    const {
      contentWithGenres,
      isFocusedHeaderItem,
      selectedHeaderItemRef,
      focusedGenreRef,
    } = this.props;
    const showsToDisplay = contentWithGenres.filter((item, index) =>
      focusedGenre ? item.genre === focusedGenre : !index,
    )[0].content;
    return (
      <View style={styles.root}>
        <View style={styles.leftBlock}>
          {contentWithGenres.map((item, index) => {
            const genreName = item.genre;
            const needFocusedStyles =
              isFocusedGenre &&
              !isFocusedHeaderItem &&
              !isFocusedShow &&
              focusedGenre === genreName;
            const needActiveStyles =
              focusedGenre === genreName &&
              ((isFocusedHeaderItem && focusedShow) ||
                (!isFocusedHeaderItem && isFocusedShow));
            return (
              <TouchableOpacity
                key={genreName}
                style={[
                  styles.genreBlock,
                  needFocusedStyles && styles.genreBlockFocused,
                  needActiveStyles && styles.genreBlockActive,
                ]}
                ref={ref => (this[`Genre${index}`] = ref)}
                nextFocusUp={!index && findNodeHandle(selectedHeaderItemRef)}
                nextFocusRight={findNodeHandle(this['Show0'])}
                onFocus={this.handleGenreFocus.bind(
                  this,
                  genreName,
                  this[`Genre${index}`],
                )}>
                <Text
                  accessible={false}
                  style={[
                    styles.whiteText,
                    needFocusedStyles && styles.blackText,
                  ]}>
                  {genreName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.rightBlock}>
          {showsToDisplay.map((show, index) => {
            const imageURL = show.images.image;
            const showName = show.title_name;
            const slug = show.slug;
            const isShowInFirstRow = index < 3;
            const isShowInFirstColumn = !(index % 3);
            const needDownFocus =
              index >= Math.floor(showsToDisplay.length / 3) * 3;
            const needRightFocus =
              showsToDisplay.length < 3 && index === showsToDisplay.length - 1;
            const renderText =
              !isFocusedHeaderItem && isFocusedShow && focusedShow === showName;
            const cardScale = SCALE_VALUE.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.05],
            });
            let transformStyle = {transform: [{scale: cardScale}]};
            return (
              <TouchableOpacity
                nextFocusUp={
                  isShowInFirstRow && findNodeHandle(selectedHeaderItemRef)
                }
                nextFocusLeft={
                  isShowInFirstColumn && findNodeHandle(focusedGenreRef)
                }
                nextFocusDown={
                  needDownFocus && findNodeHandle(this[`Show${index}`])
                }
                nextFocusRight={
                  needRightFocus && findNodeHandle(this[`Show${index}`])
                }
                activeOpacity={1}
                ref={ref => (this[`Show${index}`] = ref)}
                style={styles.showBlock}
                onBlur={this.handleBlur}
                onPress={this.handleShowPress.bind(this, slug, imageURL)}
                onFocus={this.handleShowFocus.bind(this, showName)}>
                <Animated.Image
                  source={{uri: imageURL}}
                  style={[
                    styles.imageBlock,
                    focusedShow === showName && transformStyle,
                  ]}
                />
                {renderText && (
                  <Text
                    numberOfLines={2}
                    accessible={false}
                    style={[styles.whiteText, styles.centeredText]}>
                    {showName}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}
