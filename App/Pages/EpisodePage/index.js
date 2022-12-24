import React from 'react';
import {View, Text} from 'react-native';
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
    const wm = videoData?.wm;
    return (
      <View style={styles.root}>
        {!!videoSource && (
          <Video
            resizeMode={'cover'}
            source={{
              uri: videoSource,
            }}
            drm={drmInfo}
            style={styles.videoBlock}
          />
        )}
        {!!wm && !!wm.length && this.renderWM(wm)}
      </View>
    );
  }

  renderWM = wm => {
    const {content} = wm[0];
    const wmStyles = {
      fontSize: 2 * +wm[0].font_size,
      color: wm[0].font_color,
    };
    return (
      <View style={[styles.wmBlock]}>
        <Text style={wmStyles}>{content}</Text>
      </View>
    );
  };
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
