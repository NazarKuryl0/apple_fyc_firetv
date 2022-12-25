import {StyleSheet} from 'react-native';

import {Colors} from '../../../Shared';

const rightBlockWidth = 590;
const imageBlockWidth = 180;

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 40,
    flexDirection: 'row',
  },
  leftBlock: {
    width: 300,
  },
  genreBlock: {
    width: '100%',
    height: 28,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  genreBlockFocused: {
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  genreBlockActive: {
    backgroundColor: Colors.dimGray,
    borderRadius: 10,
  },
  whiteText: {
    color: Colors.white,
  },
  blackText: {
    color: Colors.black,
  },
  centeredText: {
    textAlign: 'center',
  },
  rightBlock: {
    width: rightBlockWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -10,
  },
  showBlock: {
    width: rightBlockWidth / 3,
    height: (rightBlockWidth * 3) / 16 + 30,
    alignItems: 'center',
    paddingTop: 10,
  },
  imageBlock: {
    width: imageBlockWidth,
    height: (imageBlockWidth * 9) / 16,
    borderRadius: 10,
  },
});
