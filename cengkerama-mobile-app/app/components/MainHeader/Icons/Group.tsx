import * as React from "react";
import Svg, { Mask, Path, Rect } from "react-native-svg";

function Group() {
  return (
    <Svg width={23} height={23} viewBox="0 0 32 23" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.404 5.84a2.84 2.84 0 11-5.68 0 2.84 2.84 0 015.68 0zm-.73 4.358a4.84 4.84 0 10-4.22 0 8.578 8.578 0 00-6.22 6.302 8.587 8.587 0 00-.234 2h17.128c0-.689-.082-1.358-.235-2a8.578 8.578 0 00-6.22-6.302zM16.31 16.5a6.567 6.567 0 0112.507 0H16.31z"
        fill="#fff"
      />
      <Path
        d="M25 21.5H5.5v-2c0-.5.5-1 2-3s3-3 4.5-3.5 3-.5 5.5 0 3.5 1.5 5 3c1.2 1.2 2.167 4.167 2.5 5.5zM10.5 8.5C9.5 7 10 5 11.5 3l2-1.5H16c1 0 1.5.5 2.5 1s1 1 1.5 2.5 0 2.5-.5 4.5-3.5 1.5-6 1.5-2-1-3-2.5z"
        fill="#2675EC"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.234 6.223a4.223 4.223 0 11-8.447 0 4.223 4.223 0 018.447 0zm-1.51 5.603a6.223 6.223 0 10-5.426 0A11.025 11.025 0 004.18 20.5a11.073 11.073 0 00-.181 2h22.021c0-.683-.062-1.351-.18-2a11.025 11.025 0 00-8.118-8.674zM6.222 20.5a9.014 9.014 0 0117.576 0H6.223z"
        fill="#fff"
      />
      <Rect
        x={3.83}
        y={5.702}
        width={1.915}
        height={9.574}
        rx={0.957}
        fill="#fff"
      />
      <Rect
        y={11.447}
        width={1.915}
        height={9.574}
        rx={0.957}
        transform="rotate(-90 0 11.447)"
        fill="#fff"
      />
    </Svg>
  );
}

export default Group;
