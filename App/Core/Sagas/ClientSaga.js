import {put, select} from 'redux-saga/effects';

import client from '../Services/client';
import {
  INT,
  PROD,
  FYC,
  ConfigRefererINT,
  ConfigRefererUAT,
  ConfigRefererPROD,
  FYCRefererPROD,
  FYCRefererINT,
  FYCRefererUAT,
  PressRefererPROD,
  PressRefererINT,
  PressRefererUAT,
} from '../../Shared/Constants';
import {
  CHANGE_CLIENT_ENV_SUCCESS,
  CHANGE_CLIENT_REFERER_SUCCESS,
} from '../Store/Client/Actions';
import {SHOW_LOADER, HIDE_LOADER} from '../Store/Common/Actions';

export function* changeClientENV({payload}) {
  yield put({
    type: SHOW_LOADER,
  });
  const {
    client: {isFYCContent},
  } = yield select();
  let referer;
  let baseURL;
  if (isFYCContent) {
    if (payload === PROD) {
      baseURL = ConfigRefererPROD;
      referer = FYCRefererPROD;
    } else if (payload === INT) {
      baseURL = ConfigRefererINT;
      referer = FYCRefererINT;
    } else {
      baseURL = ConfigRefererUAT;
      referer = FYCRefererUAT;
    }
  } else {
    if (payload === PROD) {
      baseURL = ConfigRefererPROD;
      referer = PressRefererPROD;
    } else if (payload === INT) {
      baseURL = ConfigRefererINT;
      referer = PressRefererINT;
    } else {
      baseURL = ConfigRefererUAT;
      referer = PressRefererUAT;
    }
  }
  client.defaults.baseURL = baseURL;
  client.defaults.headers.Referer = referer;
  yield put({
    type: CHANGE_CLIENT_ENV_SUCCESS,
    payload: {
      env: payload,
      baseURL: baseURL,
      referer: referer,
    },
  });
  yield put({
    type: HIDE_LOADER,
  });
}

export function* changeClientReferer({payload}) {
  yield put({
    type: SHOW_LOADER,
  });
  const {
    client: {env},
  } = yield select();
  let referer;
  let baseURL;
  if (payload === FYC) {
    if (env === PROD) {
      baseURL = ConfigRefererPROD;
      referer = FYCRefererPROD;
    } else if (env === INT) {
      baseURL = ConfigRefererINT;
      referer = FYCRefererINT;
    } else {
      baseURL = ConfigRefererUAT;
      referer = FYCRefererUAT;
    }
  } else {
    if (env === PROD) {
      baseURL = ConfigRefererPROD;
      referer = PressRefererPROD;
    } else if (env === INT) {
      baseURL = ConfigRefererINT;
      referer = PressRefererINT;
    } else {
      baseURL = ConfigRefererUAT;
      referer = PressRefererUAT;
    }
  }
  client.defaults.baseURL = baseURL;
  client.defaults.headers.Referer = referer;
  yield put({
    type: CHANGE_CLIENT_REFERER_SUCCESS,
    payload: {
      referer: referer,
      baseURL: baseURL,
      isFYCContent: payload === FYC,
    },
  });
  yield put({
    type: HIDE_LOADER,
  });
}
