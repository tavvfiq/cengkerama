import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Trash() {
  return (
    <Svg
      width={18}
      height={22}
      viewBox="0 0 18 22"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2a2 2 0 10-4 0H2.5a2.5 2.5 0 00-.384 4.97l.002.03.716 12.176A3 3 0 005.829 22h6.342a3 3 0 002.995-2.824L15.882 7l.002-.03A2.5 2.5 0 0015.5 2H11zM9 4H2.5a.5.5 0 000 1h13a.5.5 0 000-1H9zM4.83 19.059L4.121 7h9.758l-.71 12.059a1 1 0 01-.998.941H5.83a1 1 0 01-.999-.941zM6 10a1 1 0 112 0v7a1 1 0 11-2 0v-7zm5-1a1 1 0 00-1 1v7a1 1 0 102 0v-7a1 1 0 00-1-1z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Trash;
