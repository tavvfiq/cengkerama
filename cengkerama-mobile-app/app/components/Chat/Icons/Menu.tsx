import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function Menu() {
  return (
    <Svg width={20} height={19} viewBox="0 0 20 19" fill="none">
      <Rect width={5} height={5} rx={2.5} fill="#2675EC" />
      <Rect x={15} width={5} height={5} rx={2.5} fill="#2675EC" />
      <Rect y={14} width={5} height={5} rx={2.5} fill="#2675EC" />
      <Rect x={15} y={14} width={5} height={5} rx={2.5} fill="#2675EC" />
    </Svg>
  );
}

export default Menu;
