import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Bookmark() {
  return (
    <Svg
      width={16}
      height={20}
      viewBox="0 0 16 20"
      fill="none"
    >
      <Path
        d="M1 2a1 1 0 011-1h12a1 1 0 011 1v15.82a1 1 0 01-1.628.778l-3.49-2.813a3 3 0 00-3.765 0l-3.49 2.813A1 1 0 011 17.819V2z"
        stroke="#fff"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default Bookmark;