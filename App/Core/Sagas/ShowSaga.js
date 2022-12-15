import {put, call} from 'redux-saga/effects';

import {SHOW_LOADER, HIDE_LOADER} from '../Store/Common/Actions';
import {
  FETCH_SHOW_DATA_FAILED,
  FETCH_SHOW_DATA_SUCCESS,
} from '../Store/ShowPage/Actions';
import {showsService} from '../Services/ShowsService';
import Navigator from '../Services/NavigationService';

export function* fetchShowData({payload}) {
  yield put({
    type: SHOW_LOADER,
  });
  const {data} = yield call(() => showsService.fetchShowDetails(payload));
  if (!data.success) {
    yield put({
      type: FETCH_SHOW_DATA_FAILED,
      payload: data.message,
    });
  } else {
    const {summary, genres, release_year, runtime} = data.data[0];
    yield put({
      type: FETCH_SHOW_DATA_SUCCESS,
      payload: {
        summary,
        genres,
        release_year,
        runtime,
      },
    });
    Navigator.navigate('ShowPage');
  }
  yield put({
    type: HIDE_LOADER,
  });
}
