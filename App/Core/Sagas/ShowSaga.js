import {put, call} from 'redux-saga/effects';

import {SHOW_LOADER, HIDE_LOADER} from '../Store/Common/Actions';
import {
  FETCH_SHOW_DATA_FAILED,
  FETCH_SHOW_DATA_SUCCESS,
  FETCH_SHOW_EPISODES_DATA_FAILED,
  FETCH_SHOW_EPISODES_DATA_SUCCESS,
} from '../Store/ShowPage/Actions';
import {FEATURE} from '../../Shared/Constants';
import {showsService} from '../Services/ShowsService';
import Navigator from '../Services/NavigationService';

export function* fetchShowData({payload}) {
  const {showSlug, showBackground} = payload;
  yield put({
    type: SHOW_LOADER,
  });
  Navigator.navigate('ShowPage');
  const {data} = yield call(() => showsService.fetchShowDetails(showSlug));
  if (!data.success) {
    yield put({
      type: FETCH_SHOW_DATA_FAILED,
      payload: data.message,
    });
  } else {
    const {summary, genres, release_year, runtime, title_type, id} =
      data.data[0];
    if (title_type === FEATURE) {
      const {data: showEpisodesData} = yield call(() =>
        showsService.fetchSeasonEpisodes(id),
      );
      if (!showEpisodesData.success) {
        yield put({
          type: FETCH_SHOW_EPISODES_DATA_FAILED,
          payload: showEpisodesData.message,
        });
      } else {
        yield put({
          type: FETCH_SHOW_EPISODES_DATA_SUCCESS,
          payload: showEpisodesData.data,
        });
      }
    } else {
    }
    yield put({
      type: FETCH_SHOW_DATA_SUCCESS,
      payload: {
        showSlug,
        summary,
        showBackground,
        genres,
        release_year,
        runtime,
      },
    });
  }
  yield put({
    type: HIDE_LOADER,
  });
}
