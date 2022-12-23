import {StyleSheet} from 'react-native';

import {Colors} from '../../../Shared';

export const itemWidth = 205;

export const styles = StyleSheet.create({
  itemBlock: {
    width: itemWidth,
    height: (itemWidth * 9) / 16 + 40,
    marginRight: 20,
    marginBottom: 10,
  },
  itemImage: {
    width: '100%',
    height: (itemWidth * 9) / 16,
    borderRadius: 10,
  },
  whiteText: {
    color: Colors.white,
  },
  boldText: {
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
});
