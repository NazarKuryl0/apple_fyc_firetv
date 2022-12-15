import {put, call, all} from 'redux-saga/effects';

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
import {WATCH_NOW} from '../../Shared/Constants';

export function* fetchShowData({payload}) {
  const {showSlug} = payload;
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
    let episodesDataToDisplay;
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
        episodesDataToDisplay = [{
          seasonName: WATCH_NOW,
          seasonEpisodes: showEpisodesData.data,
        }];
        yield put({
          type: FETCH_SHOW_EPISODES_DATA_SUCCESS,
          payload: episodesDataToDisplay,
        });
      }
    } else {
      const {data: seasonsData} = yield call(() =>
        showsService.fetchShowSeasons(showSlug),
      );
      if (!seasonsData.success) {
        yield put({
          type: FETCH_SHOW_EPISODES_DATA_FAILED,
          payload: seasonsData.message,
        });
      } else {
        const episodesData = yield all(
          seasonsData.data.map(season => {
            return call(() => showsService.fetchSeasonEpisodes(season.id));
          }),
        );
        if (!episodesData[0].data.success) {
          yield put({
            type: FETCH_SHOW_EPISODES_DATA_FAILED,
            payload: episodesData[0].data.message,
          });
        } else {
          episodesDataToDisplay = episodesData.map(episodes => {
            return {
              seasonName: episodes.data.data[0].season_name,
              seasonEpisodes: episodes.data.data,
            };
          });
          yield put({
            type: FETCH_SHOW_EPISODES_DATA_SUCCESS,
            payload: episodesDataToDisplay,
          });
        }
      }
    }
    yield put({
      type: FETCH_SHOW_DATA_SUCCESS,
      payload: {
        showSlug,
        summary,
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
