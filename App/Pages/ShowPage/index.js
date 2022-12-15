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
import {convertShowRuntime} from '../../Shared/Helpers';
import {Blur, Shadow} from '../../Shared';
import Play from '../../Assets/Icons/play.svg';
import {styles} from './styles';

const logo = require('../../Assets/Images/Logo.jpg');

class ShowPage extends React.Component {
  state = {
    focusedItem: BUTTON,
    focusedSeason: null,
    focusedSeasonRef: null,
    isSetUpFirstTimeSeasonRef: false,
  };
  componentDidUpdate(prevProps) {
    const {isSetUpFirstTimeSeasonRef} = this.state;
    const {showEpisodes} = this.props;
    if (!isSetUpFirstTimeSeasonRef && showEpisodes.length && this['Season0']) {
      this.setState({isSetUpFirstTimeSeasonRef: true});
      if (showEpisodes.length > 1) {
        this.setState({focusedSeasonRef: this['Season0']});
      }
    }
  }
  render() {
    const {showData, showEpisodes} = this.props;
    const showBackground = showData && showData.showBackground;
    return (
      <ScrollView
        contentContainerStyle={styles.root}
        ref={ref => (this.main = ref)}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        bounces={false}>
        {!!showBackground && (
          <View>
            <Image source={{uri: showBackground}} style={styles.background} />
            <Image
              source={{uri: showBackground}}
              blurRadius={50}
              style={[styles.background, styles.backgroundSecond]}
            />
          </View>
        )}
        <Blur />
        <Shadow />
        <View style={styles.logoBlock}>
          <Image source={logo} resizeMode="center" style={styles.logo} />
        </View>
        <View style={styles.showDescriptionBlock}>
          {!!showEpisodes && this.renderButton(showEpisodes)}
          {!!showData && this.renderShowDescription(showData)}
        </View>
        {!!showEpisodes && this.renderEpisodes(showEpisodes)}
      </ScrollView>
    );
  }

  handleButtonFocus = () => {
    this.main.scrollTo({y: 0, animated: true});
    this.setState({focusedItem: BUTTON});
  };

  renderButton = showEpisodes => {
    const {focusedSeasonRef} = this.state;
    return (
      <TouchableOpacity
        hasTVPreferredFocus
        activeOpacity={1}
        ref={ref => (this[BUTTON] = ref)}
        onFocus={this.handleButtonFocus}
        nextFocusDown={
          focusedSeasonRef
            ? findNodeHandle(focusedSeasonRef)
            : showEpisodes.length > 1
            ? findNodeHandle(this['Season0'])
            : null
        }
        style={styles.buttonBlock}>
        <Play />
        <Text accessible={false} style={styles.buttonText}>
          Play
        </Text>
      </TouchableOpacity>
    );
  };

  renderShowDescription = showData => {
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

  handleSeasonFocus = value => {
    this.main.scrollToEnd({animated: true});
    this.setState({focusedItem: value});
  };

  handleSeasonPress = (value, ref) => {
    this.episodeScrollBlock.scrollTo({x: 0, animated: true});
    this.setState({focusedSeason: value, focusedSeasonRef: ref});
  };

  handleEpisodeFocus = value => {
    this.main.scrollToEnd({animated: true});
    this.setState({focusedItem: value});
  };

  renderEpisodes = showEpisodes => {
    const {focusedItem, focusedSeason, focusedSeasonRef} = this.state;
    const Block = showEpisodes.length > 1 ? TouchableOpacity : View;
    const esisodesToDisplay =
      showEpisodes.length === 1
        ? showEpisodes[0].seasonEpisodes
        : focusedSeason
        ? showEpisodes.filter(season => season.seasonName === focusedSeason)[0]
            .seasonEpisodes
        : showEpisodes[0].seasonEpisodes;
    return (
      <View style={styles.episodesBlock}>
        <View style={styles.seasonsBlock}>
          {showEpisodes.map((season, seasonIndex) => (
            <Block
              key={season.seasonName}
              ref={ref => (this[`Season${seasonIndex}`] = ref)}
              nextFocusRight={
                seasonIndex === showEpisodes.length - 1 &&
                findNodeHandle(this[`Season${seasonIndex}`])
              }
              style={[
                styles.episodesHeaderBlock,
                focusedSeasonRef === this[`Season${seasonIndex}`] &&
                  styles.episodesHeaderBlockActive,
              ]}
              onPress={this.handleSeasonPress.bind(
                this,
                season.seasonName,
                this[`Season${seasonIndex}`],
              )}
              onFocus={this.handleSeasonFocus.bind(this, season.seasonName)}>
              <Text
                accessible={false}
                style={[
                  styles.episodesHeader,
                  focusedItem === season.seasonName && styles.activeBlock,
                ]}>
                {season.seasonName}
              </Text>
            </Block>
          ))}
        </View>
        <ScrollView
          ref={ref => (this.episodeScrollBlock = ref)}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}>
          {esisodesToDisplay.map((episode, episodeIndex) => {
            const {poster, runtime, asset_id, name, summary} = episode;
            return (
              <TouchableOpacity
                key={asset_id}
                style={[
                  styles.episodeBlock,
                  episodeIndex === esisodesToDisplay.length - 1 &&
                    styles.lastItem,
                ]}
                nextFocusUp={findNodeHandle(focusedSeasonRef)}
                onFocus={this.handleEpisodeFocus.bind(this, name)}>
                <Image
                  resizeMode="contain"
                  source={{uri: poster}}
                  style={styles.episodeImage}
                />
                <View
                  style={[
                    styles.episodeDescriptionBlock,
                    focusedItem === name && styles.activeBlock,
                  ]}>
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
                    {convertShowRuntime(runtime)}
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
