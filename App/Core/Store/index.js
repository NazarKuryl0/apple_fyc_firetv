import {combineReducers} from 'redux';

import configureStore from './ConfigureStore';
import rootSaga from '../Sagas';
import {reducer as userReducer} from './User/Reducers';
import {reducer as clientReducer} from './Client/Reducers';
import {reducer as commonReducer} from './Common/Reducers';
import {reducer as homePageReducer} from './HomePage/Reducers';
import {reducer as showPageReducer} from './ShowPage/Reducers';

export default () => {
  const rootReducer = combineReducers({
    user: userReducer,
    client: clientReducer,
    common: commonReducer,
    home: homePageReducer,
    show: showPageReducer,
  });
  return configureStore(rootReducer, rootSaga);
};
