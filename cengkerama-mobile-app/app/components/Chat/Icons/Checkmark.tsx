import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CheckMark() {
  return (
    <Svg
      width={26}
      height={13}
      viewBox="0 0 26 13"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.42 11.727L25.873 1.424 24.469 0 14.016 10.303l-1.994-1.994 6.541-6.91L17.111.026l-9.69 10.233-5.969-6.305L0 5.328l5.97 6.305a2 2 0 002.904 0l1.772-1.872 1.956 1.956a2 2 0 002.818.01z"
        fill="#fff"
      />
    </Svg>
  )
}

export default CheckMark;
