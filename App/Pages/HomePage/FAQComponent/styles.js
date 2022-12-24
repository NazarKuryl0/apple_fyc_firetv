import {StyleSheet} from 'react-native';

import {Colors} from '../../../Shared';

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 40,
  },
  itemBlock: {
    width: 350,
    padding: 10,
  },
  itemBlockActive: {
    borderRadius: 10,
    backgroundColor: Colors.dimGray,
  },
  question: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  answer: {
    color: Colors.lightGray,
    textAlign: 'justify',
  },
});
