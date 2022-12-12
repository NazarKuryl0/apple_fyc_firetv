import {StyleSheet} from 'react-native';

import {Colors} from '../../Shared';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 20,
  },
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerCenterBlock: {
    width: 300,
    backgroundColor: Colors.dimGray,
    flexDirection: 'row',
    borderRadius: 20,
    height: 30,
  },
  headerBlockText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  headerBlockTextActive: {
    color: Colors.black,
  },
  headerBlockTextActiveSection: {
    color: Colors.white,
  },
  headerBlockItem: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    heigth: 30,
    padding: 5,
  },
  headerBlockItemActive: {
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  headerBlockItemActiveSection: {
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
  },
  allContent: {
    headerText: {
      color: Colors.white,
      fontSize: 20,
      fontWeight: 'bold',
    },
    categoryBlock: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    itemBlock: {
      height: 160,
      width: 220,
      marginRight: 40 / 3,
    },
    itemBlockWithoutMargin: {
      marginRight: 0,
    },
    itemImage: {
      width: '100%',
      height: (220 * 9) / 16,
      borderRadius: 10,
    },
    itemText: {
      color: Colors.white,
      textAlign: 'center',
    },
  },
  footerBlock: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    color: Colors.dimGray,
  },
  footerTextPoweredBy: {
    color: Colors.white,
  },
});
