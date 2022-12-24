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
    const {changeFocusedShow} = this.props;
    changeFocusedShow(null);
    this.setState({focusedItem: item});
  };

  render() {
    const {focusedItem} = this.state;
    const {
      isFYCContent,
      handleHeaderItemPress,
      selectedHeaderItem,
      focusedShow,
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
            const needFocusedStyles = focusedItem === item && !focusedShow;
            const needActiveStyles =
              selectedHeaderItem === item &&
              (focusedShow || (!focusedShow && focusedItem !== item));
            return (
              <TouchableOpacity
                key={item}
                activeOpacity={1}
                ref={ref => (this[item] = ref)}
                hasTVPreferredFocus={item === ALL}
                onPress={handleHeaderItemPress.bind(this, item)}
                onFocus={this.handleItemFocus.bind(this, item)}
                style={[
                  styles.centerItem,
                  needFocusedStyles && styles.centerItemFocused,
                  needActiveStyles && styles.centerItemActive,
                ]}>
                <Text
                  accessible={false}
                  style={[
                    styles.whiteText,
                    styles.boldText,
                    needFocusedStyles && styles.focusedText,
                    needActiveStyles && styles.activeText,
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
