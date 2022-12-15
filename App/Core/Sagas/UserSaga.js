import {put, call} from 'redux-saga/effects';

import {
  FETCH_USER_FAILED,
  FETCH_USER_SUCCESS,
  CLEAR_USER_DATA,
} from '../Store/User/Actions';
import {
  SET_CLIENT_AUTHORIZATION_HEADER,
  CLEAR_CLIENT_DATA,
} from '../Store/Client/Actions';
import {SHOW_LOADER, HIDE_LOADER} from '../Store/Common/Actions';
import {SET_NEED_UPDATE_HOME_PAGE_DATA_TO_TRUE} from '../Store/HomePage/Actions';
import Navigator from '../Services/NavigationService';
import {userService} from '../Services/UserService';

export function* validateUser() {
  yield put({
    type: SHOW_LOADER,
  });
  const {data} = yield call(() => userService.validateUser());
  if (data.success) {
    yield put({
      type: SET_NEED_UPDATE_HOME_PAGE_DATA_TO_TRUE,
    });
    Navigator.navigateAndReset('HomePage');
  } else {
    yield put({
      type: CLEAR_USER_DATA,
    });
    yield put({
      type: CLEAR_CLIENT_DATA,
    });
  }
  yield put({
    type: HIDE_LOADER,
  });
}

export function* fetchFYCUser({payload}) {
  yield put({
    type: SHOW_LOADER,
  });
  const {data} = yield call(() => userService.fetchUser({auth_code: payload}));
  if (!data.success) {
    yield put({
      type: SET_CLIENT_AUTHORIZATION_HEADER,
      payload: null,
    });
    yield put({
      type: FETCH_USER_FAILED,
      payload: data.message,
    });
  } else {
    const token = `Token ${data.token}`;
    yield put({
      type: SET_CLIENT_AUTHORIZATION_HEADER,
      payload: token,
    });
    yield put({
      type: FETCH_USER_SUCCESS,
      payload: token,
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
      type: SET_CLIENT_AUTHORIZATION_HEADER,
      payload: null,
    });
    yield put({
      type: FETCH_USER_FAILED,
      payload: data.message,
    });
  } else {
    const token = `Token ${data.token}`;
    yield put({
      type: SET_CLIENT_AUTHORIZATION_HEADER,
      payload: token,
    });
    yield put({
      type: FETCH_USER_SUCCESS,
      payload: token,
    });
    Navigator.navigateAndReset('HomePage');
  }
  yield put({
    type: HIDE_LOADER,
  });
}
