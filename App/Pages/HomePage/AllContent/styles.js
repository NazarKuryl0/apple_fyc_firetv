import {StyleSheet} from 'react-native';

import {Colors} from '../../../Shared';
import {WIDTH} from '../../../Shared/Constants';

export const imageWidth = 195;
const itemWidth = 205;

export const styles = StyleSheet.create({
  banner: {
    width: WIDTH,
    height: 180,
  },
  mainBlock: {
    marginHorizontal: 40,
  },
  boldText: {
    fontWeight: 'bold',
  },
  whiteText: {
    color: Colors.white,
  },
  centerText: {
    textAlign: 'center',
  },
  itemBlock: {
    width: itemWidth,
    height: (itemWidth * 9) / 16 + 20,
    marginRight: 20,
    marginBottom: 10,
    paddingTop: 10,
    alignItems: 'center',
  },
  lastItemBlock: {
    marginRight: 0,
  },
  itemImage: {
    width: imageWidth,
    height: (imageWidth * 9) / 16,
    borderRadius: 10,
  },
});
