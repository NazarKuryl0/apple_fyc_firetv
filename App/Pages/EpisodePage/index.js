import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Video from 'react-native-video';

import {CLEAR_VIDEO_DATA} from '../../Core/Store/Video/Actions';

import {styles} from './styles';

class EpsiodePage extends React.Component {
  componentWillUnmount() {
    const {clearVideoData} = this.props;
    clearVideoData();
  }
  render() {
    const {videoData} = this.props;
    const videoSource = videoData?.videoSource;
    const drmInfo = videoData?.drmInfo;
    return (
      <View style={styles.root}>
        {!!videoSource && (
          <Video
            resizeMode="contain"
            source={{
              uri: videoSource,
            }}
            drm={drmInfo}
            style={styles.videoBlock}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({video}) => ({
  videoData: video.videoData,
});

const mapDispatchToProps = dispatch => ({
  clearVideoData: () => {
    dispatch({
      type: CLEAR_VIDEO_DATA,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EpsiodePage);
