import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Contact() {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.41 6.648a4.648 4.648 0 11-9.296 0 4.648 4.648 0 019.296 0zm-1.75 5.985a6.648 6.648 0 10-5.796 0 11.776 11.776 0 00-8.695 9.402 11.84 11.84 0 00-.169 2h23.523c0-.682-.058-1.35-.169-2a11.776 11.776 0 00-8.694-9.402zM2.205 22.035c.923-4.432 4.851-7.762 9.557-7.762s8.634 3.33 9.556 7.762H2.205z"
        fill="#2675EC"
      />
    </Svg>
  );
}

export default Contact;
