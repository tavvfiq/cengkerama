import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../../constant';

function More() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.bluePrimary}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M17 10H3M21 6H3M21 14H3M17 18H3" />
    </Svg>
  );
}

export default More;
