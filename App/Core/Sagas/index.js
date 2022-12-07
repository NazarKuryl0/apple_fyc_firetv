import {takeLatest, all} from 'redux-saga/effects';

import {FETCH_FYC_USER} from '../Store/User/Actions';
import {
  CHANGE_CLIENT_ENV,
  CHANGE_CLIENT_REFERER,
} from '../Store/Client/Actions';

import {fetchFYCUser} from './UserSaga';
import {changeClientENV, changeClientReferer} from './ClientSaga';

export default function* root() {
  yield all([takeLatest(FETCH_FYC_USER, fetchFYCUser)]);

  yield all([takeLatest(CHANGE_CLIENT_ENV, changeClientENV)]);
  yield all([takeLatest(CHANGE_CLIENT_REFERER, changeClientReferer)]);
}
