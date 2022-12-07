import {takeLatest, all} from 'redux-saga/effects';

import {FETCH_FYC_USER, FETCH_PRESS_USER} from '../Store/User/Actions';
import {
  CHANGE_CLIENT_ENV,
  CHANGE_CLIENT_REFERER,
} from '../Store/Client/Actions';
import {FETCH_HOME_PAGE_DATA} from '../Store/HomePage/Actions';

import {fetchFYCUser, fetchPRESSUser} from './UserSaga';
import {changeClientENV, changeClientReferer} from './ClientSaga';
import {fetchHomePageData} from './HomePageSaga';

export default function* root() {
  yield all([takeLatest(FETCH_FYC_USER, fetchFYCUser)]);
  yield all([takeLatest(FETCH_PRESS_USER, fetchPRESSUser)]);

  yield all([takeLatest(CHANGE_CLIENT_ENV, changeClientENV)]);
  yield all([takeLatest(CHANGE_CLIENT_REFERER, changeClientReferer)]);

  yield all([takeLatest(FETCH_HOME_PAGE_DATA, fetchHomePageData)]);
}
