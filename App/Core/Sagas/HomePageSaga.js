import {put, call, select} from 'redux-saga/effects';

import {SHOW_LOADER, HIDE_LOADER} from '../Store/Common/Actions';
import {
  FETCH_HOME_PAGE_DATA_FAILED,
  FETCH_HOME_PAGE_DATA_SUCCESS,
} from '../Store/HomePage/Actions';
import {homePageService} from '../Services/HomePageService';
import {FYC, PRESS} from '../../Shared/Constants';

export function* fetchHomePageData() {
  yield put({
    type: SHOW_LOADER,
  });
  const {
    client: {isFYCContent},
  } = yield select();
  const {data} = yield call(() =>
    homePageService.fetchHomePageData(
      isFYCContent ? FYC.toLowerCase() : PRESS.toLowerCase(),
    ),
  );
  if (!data.success) {
    yield put({
      type: FETCH_HOME_PAGE_DATA_FAILED,
      payload: data.message,
    });
  } else {
    const filteredData = data.data.filter(
      item =>
        item.module.slug === 'apple-fyc-series' ||
        item.module.slug === 'apple-fyc-film',
    );
    const dataToDisplay = filteredData.map(item => {
      return {
        name: item.module.display_name,
        content: item.module.content,
      };
    });
    dataToDisplay.sort((a, b) => {
      if (!isFYCContent) {
        return a.name > b.name ? -1 : 1;
      } else {
        return a.name < b.name ? -1 : 1;
      }
    });
    yield put({
      type: FETCH_HOME_PAGE_DATA_SUCCESS,
      payload: dataToDisplay,
    });
  }
  yield put({
    type: HIDE_LOADER,
  });
}
