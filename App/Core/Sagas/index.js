import {takeLatest, all} from 'redux-saga/effects';

import {ADD_USER} from '../Store/User/Actions';
import {addUser} from './UserSaga';

export default function* root() {
  yield all([takeLatest(ADD_USER, addUser)]);
}
