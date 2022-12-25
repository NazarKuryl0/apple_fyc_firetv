import {StyleSheet} from 'react-native';

import {Colors} from '../../../Shared';

export const styles = StyleSheet.create({
  root: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  whiteText: {
    color: Colors.white,
  },
  boldText: {
    fontWeight: 'bold',
  },
  focusedText: {
    color: Colors.black,
  },
  activeText: {
    color: Colors.white,
  },
  centerBlock: {
    flexDirection: 'row',
    width: 300,
    height: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
  },
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: '100%',
  },
  centerItemActive: {
    backgroundColor: Colors.lightGray,
    borderRadius: 15,
  },
  centerItemFocused: {
    backgroundColor: Colors.white,
    borderRadius: 15,
  },
});
