import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function Location() {
  return (
    <Svg width={18} height={26} viewBox="0 0 18 26" fill="none">
      <Circle cx={8.628} cy={8.628} r={8.628} fill="#2675EC" />
      <Path d="M8.628 25.884L1.156 12.942H16.1L8.628 25.884z" fill="#2675EC" />
      <Circle cx={8.628} cy={8.628} r={3.698} fill="#fff" />
    </Svg>
  );
}

export default Location;
