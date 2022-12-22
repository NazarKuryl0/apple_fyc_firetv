import {put, call} from 'redux-saga/effects';

import {SHOW_LOADER, HIDE_LOADER} from '../Store/Common/Actions';
import {
  FETCH_VIDEO_DATA_FAILED,
  FETCH_VIDEO_DATA_SUCCESS,
} from '../Store/Video/Actions';
import {videoService} from '../Services/VideoService';
import Navigator from '../Services/NavigationService';

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
    yield put({
      type: FETCH_VIDEO_DATA_SUCCESS,
      payload: data.data,
    });
  }
  yield put({
    type: HIDE_LOADER,
  });
}
