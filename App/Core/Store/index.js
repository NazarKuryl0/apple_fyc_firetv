import {combineReducers} from 'redux';

import configureStore from './ConfigureStore';
import rootSaga from '../Sagas';
import {reducer as userReducer} from './User/Reducers';

export default () => {
  const rootReducer = combineReducers({
    user: userReducer,
  });
  return configureStore(rootReducer, rootSaga);
};
