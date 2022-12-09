import {StyleSheet} from 'react-native';

import {Colors} from '../../../Shared';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 100,
  },
  itemBlock: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  itemText: {
    color: Colors.white,
    marginLeft: 10,
  }
});
