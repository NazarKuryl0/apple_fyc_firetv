import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';

import {styles, itemWidth} from './styles';

export default class AllContent extends React.Component {
  state = {
    focusedShow: null,
  };
  handleItemFocus = item => {
    console.log(1);
    this.setState({focusedShow: item});
    const {changeIsFocusedHeaderItemValue} = this.props;
    changeIsFocusedHeaderItemValue(false);
  };
  renderItem = ({item}) => {
    const {focusedShow} = this.state;
    const {isFocusedHeaderItem} = this.props;
    const source = item.images.image;
    const name = item.title_name;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onFocus={this.handleItemFocus.bind(this, name)}
        style={styles.itemBlock}>
        <Image
          source={{uri: `${source}${itemWidth}`}}
          style={styles.itemImage}
        />
        {/* {focusedShow === name && !isFocusedHeaderItem && (
          <Text
            accessible={false}
            style={[styles.whiteText, styles.centerText]}>
            {name}
          </Text>
        )} */}
      </TouchableOpacity>
    );
  };
  render() {
    const {focusedShow} = this.state;
    const {content} = this.props;
    return (
      <View>
        {content.map(category => {
          const categoryName = category.name;
          return (
            <View key={categoryName}>
              <Text
                accessible={false}
                style={[styles.whiteText, styles.boldText]}>
                {categoryName}
              </Text>
              <FlatList
                data={category.content}
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
