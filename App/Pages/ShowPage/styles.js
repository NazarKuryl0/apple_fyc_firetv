import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../../Shared';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.black,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  logoBlock: {
    width: '100%',
    paddingTop: 30,
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  logo: {
    width: 80,
    height: 54,
  },
  showDescriptionBlock: {
    width: '100%',
    marginTop: 300,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBlock: {
    width: '22%',
    height: 45,
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.black,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  descriptionBlock: {
    width: '75%',
  },
  descriptionTextBlock: {
    height: 70,
    textAlign: 'justify',
  },
  genresBlock: {
    flexDirection: 'row',
    marginTop: 10,
  },
  descriptionText: {
    color: Colors.white,
  },
});
