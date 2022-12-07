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

export function* validateUser() {
  yield put({
    type: SHOW_LOADER,
  });
  const {user, client} = yield select();
  const isFYC = client.isFYCContent ? FYC : PRESS;
  const {token} = user;
  if (token) {
    yield put({
      type: CHANGE_CLIENT_REFERER,
      payload: isFYC,
    });
    const {data} = yield call(() => userService.validateUser(token));
    if (data.success) {
      Navigator.navigateAndReset('HomePage');
    } else {
      yield put({
        type: CLEAR_USER_DATA,
      });
    }
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
