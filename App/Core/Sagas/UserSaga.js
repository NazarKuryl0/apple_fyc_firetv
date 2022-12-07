import {put} from 'redux-saga/effects';

import {ADD_USER_SUCCESS} from '../Store/User/Actions';

export function* addUser(action) {
  yield put({
    type: ADD_USER_SUCCESS,
    payload: action.payload,
  });
}
