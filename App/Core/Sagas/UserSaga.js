import {put, call, select} from 'redux-saga/effects';

import {
  FETCH_USER_FAILED,
  FETCH_USER_SUCCESS,
  CLEAR_USER_DATA,
} from '../Store/User/Actions';
import {CHANGE_CLIENT_REFERER} from '../Store/Client/Actions';
import {SHOW_LOADER, HIDE_LOADER} from '../Store/Common/Actions';
import Navigator from '../Services/NavigationService';
import {userService} from '../Services/UserService';
import {FYC, PRESS} from '../../Shared/Constants';
import Client from '../Services/client';

export function* validateUser() {
  yield put({
    type: SHOW_LOADER,
  });
  const {user, client} = yield select();
  const {token} = user;
  const {isFYCContent, baseURL, referer} = client;
  const isFYC = isFYCContent ? FYC : PRESS;
  Client.defaults.headers.Referer = referer;
  Client.defaults.headers.Authorization = token;
  Client.defaults.baseURL = baseURL;
  yield put({
    type: CHANGE_CLIENT_REFERER,
    payload: isFYC,
  });
  const {data} = yield call(() => userService.validateUser());
  if (data.success) {
    Navigator.navigateAndReset('HomePage');
  } else {
    yield put({
      type: CLEAR_USER_DATA,
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
      type: FETCH_USER_FAILED,
      payload: data.message,
    });
  } else {
    const token = `Token ${data.token}`;
    Client.defaults.headers.Authorization = token;
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
      type: FETCH_USER_FAILED,
      payload: data.message,
    });
  } else {
    const token = `Token ${data.token}`;
    Client.defaults.headers.Authorization = token;
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
