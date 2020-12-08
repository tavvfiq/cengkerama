import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function Image() {
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
        d="M9.566 13.208l-6.561 7.157a.4.4 0 00.255.668l5.368.537h4.93l6.519-.593a.4.4 0 00.343-.272l1.13-3.388a.4.4 0 00.02-.126v-4.305l.508-5.542a.4.4 0 00-.693-.307l-8.148 8.889a.4.4 0 01-.59 0l-2.492-2.718a.4.4 0 00-.59 0z"
        fill="#2675EC"
        stroke="#2675EC"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default Image;
