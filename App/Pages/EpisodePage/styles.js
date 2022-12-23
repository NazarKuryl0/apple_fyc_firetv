import {StyleSheet} from 'react-native';

import {WIDTH, HEIGHT} from '../../Shared/Constants';

export const styles = StyleSheet.create({
  videoBlock: {
    width: WIDTH,
    height: HEIGHT,
    minWidth: WIDTH,
    minHeight: HEIGHT,
    maxHeight: HEIGHT,
    maxWidth: WIDTH,
  },
  wmBlock: {
    position: 'absolute',
    top: 100,
    left: 100,
    zIndex: 1,
  },
});
