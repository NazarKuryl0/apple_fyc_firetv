import {put, call} from 'redux-saga/effects';

import client from '../Services/client';
import {FETCH_FYC_USER_FAILED, FETCH_FYC_USER_SUCCESS} from '../Store/User/Actions';
import {userService} from '../Services/UserService';
import {FYCReferer, ConfigRefererPROD} from '../../Shared/Constants';

export function* fetchFYCUser({payload}) {
  client.defaults.headers.Referer = FYCReferer;
  client.defaults.baseURL = ConfigRefererPROD;
  const {data} = yield call(() => userService.fetchUser({auth_code: payload}));
  if (!data.success) {
    yield put({
      type: FETCH_FYC_USER_FAILED,
      payload: data.message,
    });
  } else {
    yield put({
      type: FETCH_FYC_USER_SUCCESS,
      payload: `Token ${data.token}`,
    })
  }
}
