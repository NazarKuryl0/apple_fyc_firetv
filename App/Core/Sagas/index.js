import {takeLatest, all} from 'redux-saga/effects';

import {FETCH_FYC_USER} from '../Store/User/Actions';
import {fetchFYCUser} from './UserSaga';

export default function* root() {
  yield all([takeLatest(FETCH_FYC_USER, fetchFYCUser)]);
}
