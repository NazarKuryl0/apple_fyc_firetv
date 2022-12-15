import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {
  WelcomePage,
  FYCSignInPage,
  SwitchENVPage,
  PRESSSignInEmailPage,
  PRESSSignInPasswordPage,
  HomePage,
  ShowPage,
} from './Pages';

let routeConfigMap = {
  MainScreen: WelcomePage,
  WelcomePage,
  FYCSignInPage,
  SwitchENVPage,
  PRESSSignInEmailPage,
  PRESSSignInPasswordPage,
  HomePage,
  ShowPage,
};

const StackNavigator = createStackNavigator(routeConfigMap, {
  initialRouteName: 'MainScreen',
  headerMode: 'none',
});

export default createAppContainer(StackNavigator);
