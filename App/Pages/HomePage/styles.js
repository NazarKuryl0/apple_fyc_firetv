import {StyleSheet} from 'react-native';

import {Colors} from '../../Shared';
import {WIDTH} from '../../Shared/Constants';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 40,
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
  itemBlockWithoutMargin: {
    marginRight: 0,
  },
  banner: {
    width: WIDTH,
    height: 180,
  },
  allContent: {
    headerText: {
      color: Colors.white,
      fontSize: 20,
      fontWeight: 'bold',
      paddingHorizontal: 40,
    },
    categoryBlock: {
      width: '100%',
      paddingTop: 10,
      paddingHorizontal: 40,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    itemBlock: {
      height: (210 * 9) / 16 + 40,
      width: 210,
      marginRight: 40 / 3,
    },
    itemImage: {
      width: '100%',
      height: (210 * 9) / 16,
      borderRadius: 10,
    },
    itemText: {
      color: Colors.white,
      textAlign: 'center',
    },
  },
  genresBlock: {
    mainBlock: {
      width: '100%',
      marginTop: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 40,
    },
    genresBlock: {
      width: '32%',
    },
    genreBlock: {
      width: '100%',
      height: 30,
      padding: 5,
    },
    genreBlockActive: {
      backgroundColor: Colors.white,
      borderRadius: 5,
    },
    genreBlockActiveSection: {
      backgroundColor: Colors.lightGray,
      borderRadius: 5,
    },
    genreText: {
      color: Colors.white,
    },
    genreTextActive: {
      color: Colors.black,
    },
    showsBlock: {
      width: '65%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    showBlock: {
      width: 170,
      height: (170 * 9) / 16 + 40,
      marginRight: 20,
    },
    showImage: {
      width: '100%',
      height: (170 * 9) / 16,
      borderRadius: 10,
    },
    showName: {
      color: Colors.white,
      textAlign: 'center',
    },
  },
  faqBlock: {
    mainBlock: {
      marginTop: 100,
      marginBottom: 80,
    },
    block: {
      width: 300,
      marginRight: 20,
      padding: 10,
    },
    blockActive: {
      backgroundColor: Colors.lightGray,
      borderRadius: 20,
    },
    questionText: {
      color: Colors.white,
      fontWeight: 'bold',
    },
    answerText: {
      color: Colors.white,
    },
  },
  footerBlock: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  footerText: {
    color: Colors.dimGray,
  },
  footerTextPoweredBy: {
    color: Colors.white,
  },
});
