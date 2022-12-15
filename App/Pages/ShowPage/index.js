import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  findNodeHandle,
} from 'react-native';
import {connect} from 'react-redux';

import {BUTTON} from '../../Shared/Constants';
import Play from '../../Assets/Icons/play.svg';
import {styles} from './styles';

const logo = require('../../Assets/Images/Logo.jpg');

class ShowPage extends React.Component {
  state = {
    focusedItem: BUTTON,
  };
  render() {
    const {
      showData: {showBackground},
      showEpisodes,
    } = this.props;
    return (
      <ScrollView
        contentContainerStyle={styles.root}
        ref={ref => (this.main = ref)}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Image source={{uri: showBackground}} style={styles.background} />
        <Image
          source={{uri: showBackground}}
          style={[styles.background, {top: 540}]}
        />
        <View style={styles.logoBlock}>
          <Image source={logo} resizeMode="center" style={styles.logo} />
        </View>
        <View style={styles.showDescriptionBlock}>
          {this.renderButton()}
          {this.renderShowDescription()}
        </View>
        {!!showEpisodes && this.renderEpisodes(showEpisodes)}
      </ScrollView>
    );
  }

  handleButtonFocus = () => {
    this.main.scrollTo({y: 0, animated: true});
    this.setState({focusedItem: BUTTON});
  };

  renderButton = () => {
    return (
      <TouchableOpacity
        hasTVPreferredFocus
        activeOpacity={1}
        ref={ref => (this[BUTTON] = ref)}
        onFocus={this.handleButtonFocus}
        style={styles.buttonBlock}>
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

  handleEpisodeFocus = value => {
    this.main.scrollToEnd({animated: true});
    this.setState({focusedItem: value});
  };

  renderEpisodes = episodes => {
    const {focusedItem} = this.state;
    return (
      <View style={styles.episodesBlock}>
        {focusedItem !== BUTTON && (
          <Text accessible={false} style={styles.episodesHeader}>
            Watch Now
          </Text>
        )}
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}>
          {episodes.map(episode => {
            const {poster, runtime, asset_id, name, summary} = episode;
            return (
              <TouchableOpacity
                key={asset_id}
                nextFocusUp={findNodeHandle(this[BUTTON])}
                style={styles.episodeBlock}
                onFocus={this.handleEpisodeFocus.bind(this, name)}>
                <Image
                  resizeMode="contain"
                  source={{uri: poster}}
                  style={styles.episodeImage}
                />
                <View style={styles.episodeDescriptionBlock}>
                  <Text
                    accessible={false}
                    numberOfLines={1}
                    style={[styles.episodeDescription, styles.episodeName]}>
                    {name}
                  </Text>
                  <Text
                    accessible={false}
                    numberOfLines={4}
                    style={[
                      styles.episodeSummaryBlock,
                      styles.episodeDescription,
                    ]}>
                    {summary}
                  </Text>
                  <Text
                    accessible={false}
                    numberOfLines={1}
                    style={styles.episodeDescription}>
                    {runtime}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };
}

const mapStateToProps = ({show}) => ({
  showData: show.showData,
  showEpisodes: show.showEpisodes,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
