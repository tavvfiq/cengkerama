import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Contact() {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.769 6.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-1.667 5.852a6.5 6.5 0 10-5.667 0A11.515 11.515 0 00.943 21.5c-.114.65-.173 1.318-.173 2h23c0-.682-.06-1.35-.173-2a11.515 11.515 0 00-8.494-9.148zM2.98 21.5c.918-4.286 4.728-7.5 9.289-7.5 4.56 0 8.37 3.214 9.289 7.5H2.98z"
        fill="#2675EC"
      />
    </Svg>
  )
}

export default Contact
