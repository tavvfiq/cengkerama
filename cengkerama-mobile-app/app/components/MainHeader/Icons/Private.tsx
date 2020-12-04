import * as React from 'react';
import Svg, {Rect, Path, Circle} from 'react-native-svg';

function Private() {
  return (
    <Svg width={15} height={22} viewBox="0 0 15 22" fill="none">
      <Rect
        x={1.128}
        y={8.333}
        width={12.667}
        height={12.667}
        rx={2}
        stroke="#fff"
        strokeWidth={2}
      />
      <Path
        d="M2.961 3a2 2 0 012-2h5a2 2 0 012 2v5.167h-9V3z"
        stroke="#fff"
        strokeWidth={2}
      />
      <Circle cx={7.461} cy={13.75} r={1.833} fill="#fff" />
      <Rect
        x={6.544}
        y={14.667}
        width={1.833}
        height={2.75}
        rx={0.917}
        fill="#fff"
      />
    </Svg>
  );
}

export default Private;
