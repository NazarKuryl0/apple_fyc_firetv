import {put, call} from 'redux-saga/effects';
import {DRMType} from 'react-native-video';

import {SHOW_LOADER, HIDE_LOADER} from '../Store/Common/Actions';
import {
  FETCH_VIDEO_DATA_FAILED,
  FETCH_VIDEO_DATA_SUCCESS,
} from '../Store/Video/Actions';
import {videoService} from '../Services/VideoService';
import Navigator from '../Services/NavigationService';
import {MPD, M3U8} from '../../Shared/Constants';

export function* fetchVideoData({payload}) {
  yield put({
    type: SHOW_LOADER,
  });
  const {asset_id} = payload;
  const {data} = yield call(() => videoService.fetchVideosSource(asset_id));
  if (!data.success) {
    yield put({
      type: FETCH_VIDEO_DATA_FAILED,
      payload: data.data.message,
    });
  } else {
    Navigator.navigate('EpisodePage');
    const isDRMVideo = !!data.data.widevine;
    let videoSource;
    let drmInfo;
    if (isDRMVideo) {
      videoSource = data.data.sources.filter(item=>item.src.includes(MPD))[0].src;
      drmInfo = {
        type: DRMType.WIDEVINE,
        licenseServer: data.data.widevine,
      }
    } else {
      videoSource = data.data.sources.filter(item=>item.src.includes(M3U8))[0].src;
    }
    yield put({
      type: FETCH_VIDEO_DATA_SUCCESS,
      payload: {
        videoSource,
        drmInfo,
      },
    });
  }
  yield put({
    type: HIDE_LOADER,
  });
}
