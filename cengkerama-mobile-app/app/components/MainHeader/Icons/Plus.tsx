import React from "react";
import Svg, { Path } from "react-native-svg";

import { colors } from "../../../constant";
/* SVGR has dropped some elements not supported by react-native-svg: title */

function Plus() {
  return (
    <Svg viewBox="0 0 512 512" width={23} height={23}>
      <Path
        fill="none"
        stroke={colors.bluePrimary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={48}
        d="M256 112v288m144-144H112"
      />
    </Svg>
  );
}

export default Plus;
