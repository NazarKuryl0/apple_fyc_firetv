import React from 'react';
import {TouchableOpacity, Text, ScrollView, findNodeHandle} from 'react-native';

import {styles} from './styles';

export default class FAQComponent extends React.Component {
  state = {
    focusedItem: null,
  };

  componentDidMount() {
    const {changeFAQItemRef} = this.props;
    changeFAQItemRef(this['Item0']);
  }

  handleItemFocus = (item, ref) => {
    const {changeIsFocusedHeaderItemValue, changeFAQItemRef} = this.props;
    this.setState({focusedItem: item});
    changeFAQItemRef(ref);
    changeIsFocusedHeaderItemValue(false);
  };

  render() {
    const {focusedItem} = this.state;
    const {content, isFocusedHeaderItem, selectedHeaderItemRef} = this.props;
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        fadingEdgeLength={100}
        contentContainerStyle={styles.root}>
        {content.map((item, index) => {
          const needActiveStyles =
            focusedItem === item.id && !isFocusedHeaderItem;
          return (
            <TouchableOpacity
              ref={ref => (this[`Item${index}`] = ref)}
              key={item.id}
              onFocus={this.handleItemFocus.bind(
                this,
                item.id,
                this[`Item${index}`],
              )}
              nextFocusUp={findNodeHandle(selectedHeaderItemRef)}
              style={[
                styles.itemBlock,
                needActiveStyles && styles.itemBlockActive,
              ]}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.answer}>{item.answer}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}
