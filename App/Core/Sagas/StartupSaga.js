import {put, select} from 'redux-saga/effects';

import {FYC, PRESS} from '../../Shared/Constants';
import {
  SET_CLIENT_AUTHORIZATION_HEADER,
  CHANGE_CLIENT_REFERER,
  CLEAR_CLIENT_DATA,
} from '../Store/Client/Actions';
import {CLEAR_LOADER} from '../Store/Common/Actions';
import {CLEAR_SHOW_BANNER} from '../Store/ShowPage/Actions';
import {VALIDATE_USER} from '../Store/User/Actions';

export function* startup() {
  yield put({
    type: CLEAR_LOADER,
  });
  yield put({
    type: CLEAR_SHOW_BANNER,
  });

  const {
    user: {token},
  } = yield select();
  if (token) {
    yield put({
      type: SET_CLIENT_AUTHORIZATION_HEADER,
      payload: token,
    });

    const {
      client: {isFYCContent},
    } = yield select();
    yield put({
      type: CHANGE_CLIENT_REFERER,
      payload: isFYCContent ? FYC : PRESS,
    });

    yield put({
      type: VALIDATE_USER,
    });
  } else {
    yield put({
      type: CLEAR_CLIENT_DATA,
    });
  }
}
