import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

function Friend() {
  return (
    <Svg
      width={34}
      height={24}
      viewBox="0 0 34 24"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.769 6.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-1.667 5.852a6.5 6.5 0 10-5.667 0 11.515 11.515 0 00-8.493 9.148c-.114.65-.173 1.318-.173 2h23c0-.682-.06-1.35-.173-2a11.515 11.515 0 00-8.494-9.148zM12.98 21.5c.918-4.286 4.728-7.5 9.289-7.5 4.56 0 8.37 3.214 9.289 7.5H12.98z"
        fill="#2675EC"
      />
      <Rect x={4.769} y={7} width={2} height={10} rx={1} fill="#2675EC" />
      <Rect
        x={0.769}
        y={13}
        width={2}
        height={10}
        rx={1}
        transform="rotate(-90 .769 13)"
        fill="#2675EC"
      />
    </Svg>
  )
}

export default Friend;
