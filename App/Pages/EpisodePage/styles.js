import {StyleSheet} from 'react-native';

import {WIDTH, HEIGHT} from '../../Shared/Constants';

export const styles = StyleSheet.create({
  root: {
    aspectRatio: WIDTH / HEIGHT,
    width: WIDTH,
    height: HEIGHT,
    minwidth: WIDTH,
    minheight: HEIGHT,
    maxwidth: WIDTH,
    maxheight: HEIGHT,
  },
  videoBlock: {
    aspectRatio: WIDTH / HEIGHT,
    width: WIDTH,
    height: HEIGHT,
    minwidth: WIDTH,
    minheight: HEIGHT,
    maxwidth: WIDTH,
    maxheight: HEIGHT,
  },
  wmBlock: {
    position: 'absolute',
    top: 100,
    left: 100,
    zIndex: 1,
  },
});
