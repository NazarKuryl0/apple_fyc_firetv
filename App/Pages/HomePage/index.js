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
    focusedFilm: undefined,
    isSetNativeProps: false,
  };

  componentDidMount() {
    const {fetchHomePageData} = this.props;
    fetchHomePageData();
    this[ALL].setNativeProps({
      nextFocusLeft: findNodeHandle(this[ALL]),
    });
  }

  componentDidUpdate() {
    const {isSetNativeProps} = this.state;
    if (!isSetNativeProps && this[`Show03`]) {
      this.setState({isSetNativeProps: true});
      this[`Show03`].setNativeProps({
        nextFocusUp: findNodeHandle(this[ALL]),
      });
      this[`Show02`].setNativeProps({
        nextFocusUp: findNodeHandle(this[ALL]),
      });
    }
  }

  render() {
    const {focusedHeaderItem} = this.state;
    const {content} = this.props;
    return (
      <ScrollView
        ref={ref => (this.mainScroll = ref)}
        style={styles.root}
        fadingEdgeLength={100}>
        {this.renderHeader()}
        {focusedHeaderItem === ALL && content && this.renderAllContent(content)}
        {this.renderFooter()}
      </ScrollView>
    );
  }

  handleHeaderItemFocus = item => {
    this.setState({focusedHeaderItem: item, focusedFilm: null});
  };

  renderHeader = () => {
    const {focusedHeaderItem, focusedFilm} = this.state;
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
                  focusedHeaderItem === item && styles.headerBlockItemActive,
                  focusedHeaderItem === item &&
                    focusedFilm &&
                    styles.headerBlockItemActiveSection,
                ]}
                onFocus={this.handleHeaderItemFocus.bind(this, item)}>
                <Text
                  accessible={false}
                  style={[
                    styles.headerBlockText,
                    focusedHeaderItem === item && styles.headerBlockTextActive,
                    focusedHeaderItem === item &&
                      focusedFilm &&
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

  handleFilmFocus = item => {
    this.setState({focusedFilm: item});
  };

  renderAllContent = content => {
    const {focusedFilm} = this.state;
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
                    onFocus={this.handleFilmFocus.bind(this, item.title_name)}
                    style={[
                      styles.allContent.itemBlock,
                      itemIndex % 4 === 3 &&
                        styles.allContent.itemBlockWithoutMargin,
                    ]}>
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: item.images.thumb,
                      }}
                      style={[styles.allContent.itemImage]}
                    />
                    {focusedFilm === item.title_name && (
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
}

const mapStateToProps = ({home, client}) => ({
  content: home.content,
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
