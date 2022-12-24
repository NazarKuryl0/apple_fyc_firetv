import React from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
  findNodeHandle,
} from 'react-native';

import {ANIMATION_DURATION, SCALE_VALUE} from '../../../Shared/Constants';

import {styles, imageWidth} from './styles';

const bannerURL = require('../../../Assets/Images/Banner.png');
const firstLineShows = ['Show00', 'Show01', 'Show02', 'Show03'];

export default class AllContent extends React.Component {
  componentDidMount() {
    const {selectedHeaderItemRef} = this.props;
    firstLineShows.map(item => {
      this[item].setNativeProps({
        nextFocusUp: findNodeHandle(selectedHeaderItemRef),
      });
    });
  }

  handleItemFocus = item => {
    const {changeFocusedShow} = this.props;
    changeFocusedShow(item);

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

  renderItem = ({item, index}) => {
    const {focusedShow} = this.props;

    const source = item.images.image;
    const name = item.title_name;
    const showIndex = item.index;

    const cardScale = SCALE_VALUE.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.05],
    });
    let transformStyle = {transform: [{scale: cardScale}]};
    const isLastElement = index % 4 === 3;

    return (
      <TouchableOpacity
        activeOpacity={1}
        ref={ref => (this[`Show${showIndex}`] = ref)}
        onBlur={this.handleBlur}
        onFocus={this.handleItemFocus.bind(this, name)}
        style={styles.itemBlock}>
        <Animated.Image
          source={{uri: `${source}${imageWidth}`}}
          style={[
            styles.itemImage,
            focusedShow === name && transformStyle,
            isLastElement && styles.lastItemBlock,
          ]}
        />
        {focusedShow === name && (
          <Text
            accessible={false}
            numberOfLines={2}
            style={[styles.centerText, styles.whiteText]}>
            {name}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const {content, focusedShow} = this.props;
    return (
      <View>
        <Image
          accessible={false}
          source={bannerURL}
          style={styles.banner}
          resizeMode="center"
        />
        {content.map(category => {
          const categoryName = category.name;
          return (
            <View key={categoryName} style={styles.mainBlock}>
              <Text
                accessible={false}
                style={[styles.whiteText, styles.boldText]}>
                {categoryName}
              </Text>
              <FlatList
                extraData={focusedShow}
                data={category.content}
                initialNumToRender={2}
                renderItem={this.renderItem}
                numColumns={4}
              />
            </View>
          );
        })}
      </View>
    );
  }
}
