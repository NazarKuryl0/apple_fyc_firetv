import {combineReducers} from 'redux';

import configureStore from './ConfigureStore';
import rootSaga from '../Sagas';
import {reducer as userReducer} from './User/Reducers';
import {reducer as clientReducer} from './Client/Reducers';

export default () => {
  const rootReducer = combineReducers({
    user: userReducer,
    client: clientReducer,
  });
  return configureStore(rootReducer, rootSaga);
};
