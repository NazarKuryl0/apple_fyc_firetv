import {StyleSheet} from 'react-native';

import {WIDTH, HEIGHT} from '../../Shared/Constants';

export const styles = StyleSheet.create({
  root: {
    width: WIDTH,
    height: HEIGHT,
  },
  videoBlock: {
    width: '100%',
    height: '100%',
  },
  wmBlock: {
    position: 'absolute',
    top: 100,
    left: 100,
    zIndex: 1,
  },
});
