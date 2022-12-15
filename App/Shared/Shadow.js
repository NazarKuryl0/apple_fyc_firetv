import React from 'react';
import {Svg, Defs, LinearGradient, Stop, Rect} from 'react-native-svg';

import {WIDTH, HEIGHT} from './Constants';

const Shadow = () => {
  return (
    <Svg
      width={WIDTH}
      height={HEIGHT}
      style={{position: 'absolute', height: HEIGHT, width: WIDTH, top: HEIGHT}}>
      <Defs>
        <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#000000" stopOpacity="0.5" />
          <Stop offset="1" stopColor="#000000" stopOpacity="0.5" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
    </Svg>
  );
};

export default Shadow;
