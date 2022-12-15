import {takeLatest, all} from 'redux-saga/effects';

import {
  FETCH_FYC_USER,
  FETCH_PRESS_USER,
  VALIDATE_USER,
} from '../Store/User/Actions';
import {
  CHANGE_CLIENT_ENV,
  CHANGE_CLIENT_REFERER,
  SET_CLIENT_AUTHORIZATION_HEADER,
  CLEAR_CLIENT_DATA,
} from '../Store/Client/Actions';
import {FETCH_HOME_PAGE_DATA} from '../Store/HomePage/Actions';
import {FETCH_SHOW_DATA} from '../Store/ShowPage/Actions';

import {fetchFYCUser, fetchPRESSUser, validateUser} from './UserSaga';
import {
  changeClientENV,
  changeClientReferer,
  setClientAuthorizationHeader,
  clearClientData,
} from './ClientSaga';
import {fetchHomePageData} from './HomePageSaga';
import {fetchShowData} from './ShowSaga';

export default function* root() {
  yield all([takeLatest(VALIDATE_USER, validateUser)]);
  yield all([takeLatest(FETCH_FYC_USER, fetchFYCUser)]);
  yield all([takeLatest(FETCH_PRESS_USER, fetchPRESSUser)]);

  yield all([takeLatest(CHANGE_CLIENT_ENV, changeClientENV)]);
  yield all([takeLatest(CHANGE_CLIENT_REFERER, changeClientReferer)]);
  yield all([takeLatest(CLEAR_CLIENT_DATA, clearClientData)]);
  yield all([
    takeLatest(SET_CLIENT_AUTHORIZATION_HEADER, setClientAuthorizationHeader),
  ]);

  yield all([takeLatest(FETCH_HOME_PAGE_DATA, fetchHomePageData)]);

  yield all([takeLatest(FETCH_SHOW_DATA, fetchShowData)]);
}
