import {put, call} from 'redux-saga/effects';

import {FETCH_USER_FAILED, FETCH_USER_SUCCESS} from '../Store/User/Actions';
import {SHOW_LOADER, HIDE_LOADER} from '../Store/Common/Actions';
import Navigator from '../Services/NavigationService';
import {userService} from '../Services/UserService';

export function* fetchFYCUser({payload}) {
  yield put({
    type: SHOW_LOADER,
  });
  const {data} = yield call(() => userService.fetchUser({auth_code: payload}));
  if (!data.success) {
    yield put({
      type: FETCH_USER_FAILED,
      payload: data.message,
    });
  } else {
    yield put({
      type: FETCH_USER_SUCCESS,
      payload: `Token ${data.token}`,
    });
    Navigator.navigateAndReset('HomePage');
  }
  yield put({
    type: HIDE_LOADER,
  });
}

export function* fetchPRESSUser({payload}) {
  yield put({
    type: SHOW_LOADER,
  });
  const {email, password} = payload;
  const {data} = yield call(() => userService.fetchUser({email, password}));
  if (!data.success) {
    yield put({
      type: FETCH_USER_FAILED,
      payload: data.message,
    });
  } else {
    yield put({
      type: FETCH_USER_SUCCESS,
      payload: `Token ${data.token}`,
    });
    Navigator.navigateAndReset('HomePage');
  }
  yield put({
    type: HIDE_LOADER,
  });
}
