import React from 'react';
import {View, Text, TouchableOpacity, findNodeHandle} from 'react-native';

import {PRESS, ALL, CATEGORY, FAQ, SIGN_OUT} from '../../../Shared/Constants';
import FYCLogo from '../../../Assets/Images/FYCLogo.svg';

import {styles} from './styles';

const items = [ALL, CATEGORY, FAQ];

export default class Header extends React.Component {
  state = {
    focusedItem: ALL,
  };

  componentDidMount() {
    const {changeSelectedHeaderItemRef} = this.props;
    changeSelectedHeaderItemRef(this[ALL]);
  }

  handleItemFocus = item => {
    const {changeFocusedShow, changeIsFocusedHeaderItemValue} = this.props;
    changeFocusedShow(null);
    changeIsFocusedHeaderItemValue(true);
    this.setState({focusedItem: item});
  };

  render() {
    const {focusedItem} = this.state;
    const {
      isFYCContent,
      handleHeaderItemPress,
      selectedHeaderItem,
      focusedGenreRef,
      isFocusedHeaderItem,
    } = this.props;

    return (
      <View style={styles.root}>
        {isFYCContent ? (
          <FYCLogo />
        ) : (
          <Text style={styles.whiteText}>{PRESS}</Text>
        )}
        <View style={styles.centerBlock}>
          {items.map(item => {
            const needFocusedStyles =
              isFocusedHeaderItem && focusedItem === item;
            const needActiveStyles = selectedHeaderItem === item;
            return (
              <TouchableOpacity
                key={item}
                activeOpacity={1}
                ref={ref => (this[item] = ref)}
                hasTVPreferredFocus={item === ALL}
                nextFocusDown={
                  focusedGenreRef && findNodeHandle(focusedGenreRef)
                }
                onPress={handleHeaderItemPress.bind(this, item, this[item])}
                onFocus={this.handleItemFocus.bind(this, item)}
                style={[
                  styles.centerItem,
                  needActiveStyles && styles.centerItemActive,
                  needFocusedStyles && styles.centerItemFocused,
                ]}>
                <Text
                  accessible={false}
                  style={[
                    styles.whiteText,
                    styles.boldText,
                    needActiveStyles && styles.activeText,
                    needFocusedStyles && styles.focusedText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity activeOpacity={1}>
          <Text accessible={false} style={[styles.whiteText, styles.boldText]}>
            {SIGN_OUT}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
