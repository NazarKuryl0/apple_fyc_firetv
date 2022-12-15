import {StyleSheet} from 'react-native';

import {WIDTH, HEIGHT} from '../../Shared/Constants';
import {Colors} from '../../Shared';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.black,
    height: HEIGHT * 2,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: WIDTH,
    height: HEIGHT,
  },
  backgroundSecond: {
    top: HEIGHT,
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
  episodesBlock: {
    paddingHorizontal: 20,
  },
  episodesHeader: {
    marginTop: 30,
    marginBottom: 10,
    color: Colors.white,
    fontWeight: 'bold',
  },
  episodeBlock: {
    width: 250,
  },
  episodeImage: {
    width: '100%',
    height: (250 * 9) / 16,
    borderRadius: 10,
  },
  episodeDescriptionBlock: {
    margin: 5,
    padding: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    height: 120,
  },
  episodeName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  episodeSummaryBlock: {
    marginVertical: 3,
  },
  episodeDescription: {
    color: Colors.white,
    fontSize: 12,
  },
});
