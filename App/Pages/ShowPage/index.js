import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import Play from '../../Assets/Icons/play.svg';
import {styles} from './styles';

const logo = require('../../Assets/Images/Logo.jpg');

class ShowPage extends React.Component {
  state = {
    focusedItem: 'button',
  };
  render() {
    const {
      showData: {showBackground},
    } = this.props;
    return (
      <ScrollView
        style={styles.root}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEnabled={false}>
        <Image source={{uri: showBackground}} style={styles.background} />
        <View style={styles.logoBlock}>
          <Image source={logo} resizeMode="center" style={styles.logo} />
        </View>
        <View style={styles.showDescriptionBlock}>
          {this.renderButton()}
          {this.renderShowDescription()}
        </View>
      </ScrollView>
    );
  }

  renderButton = () => {
    return (
      <TouchableOpacity
        style={styles.buttonBlock}
        hasTVPreferredFocus
        activeOpacity={1}>
        <Play />
        <Text accessible={false} style={styles.buttonText}>
          Play
        </Text>
      </TouchableOpacity>
    );
  };

  renderShowDescription = () => {
    const {showData} = this.props;
    return (
      <View style={styles.descriptionBlock}>
        <Text
          accessible={false}
          numberOfLines={4}
          style={[styles.descriptionText, styles.descriptionTextBlock]}>
          {showData.summary}
        </Text>
        <View style={styles.genresBlock}>
          {showData.genres.map(genre => (
            <Text key={genre} accessible={false} style={styles.descriptionText}>
              {`${genre} · `}
            </Text>
          ))}
          <Text accessible={false} style={styles.descriptionText}>
            {showData.release_year}
          </Text>
        </View>
      </View>
    );
  };
}

const mapStateToProps = ({show}) => ({
  showData: show.showData,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
