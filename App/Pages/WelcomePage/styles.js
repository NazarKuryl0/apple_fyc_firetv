import {StyleSheet} from 'react-native';

import {Colors} from '../../Shared';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dimGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: Colors.white,
    fontSize: 28,
    marginBottom: 20,
  },
  description: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 25,
  },
  buttonBlock: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonBlockActive: {
    backgroundColor: Colors.whiteSmoke,
    transform: [{scale: 1.06}],
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
  buttonTextActive: {
    color: Colors.black,
  },
  bottomBlock: {
    flexDirection: 'row',
  },
  bottomText: {
    fontSize: 14,
    color: Colors.white,
  },
  link: {
    textDecorationLine: 'underline',
  },
  linkActive: {
    fontWeight: 'bold',
  },
});
