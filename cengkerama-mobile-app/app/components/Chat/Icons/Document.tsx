import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function Document() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect
        x={1}
        y={1}
        width={21.419}
        height={21.419}
        rx={2}
        stroke="#2675EC"
        strokeWidth={2}
      />
      <Path
        d="M20.953 9.86L1.233 2.465h19.72V9.86z"
        fill="#2675EC"
        stroke="#2675EC"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default Document;
