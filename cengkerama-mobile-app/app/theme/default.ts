import { createTheme } from "@shopify/restyle";

import { fonts, colors as palette } from "../constant";

const theme = createTheme({
  colors: {
    chatBgMain: palette.gray,
    chatBgSecondary: palette.bluePrimary,

    chatListCardBg: palette.none,

    bluePrimary: "#2675EC",
    none: "rgba(0,0,0,0)",
    redPrimary: "#FF0000",

    darkGray: "#848484",
    gray: "#F6F6F6",
    lightGray: "#FAFAFA",

    greenPrimary: "#40D81A",
    fontBlack: "#131313",
    black: "#000000",
    white: "#FFFFFF",
  },
  spacing: {
    s: 14,
    m: 20,
    l: 28,
    xl: 34,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontSize: 28,
      lineHeight: 34,
      fontFamily: fonts.GilroyBold,
      color: "bluePrimary",
    },
    headerProfile: {
      fontSize: 20,
      lineHeight: 31,
      fontFamily: fonts.GilroyBold,
      color: "bluePrimary",
    },
    contactName: {
      fontSize: 18,
      lineHeight: 28,
      fontFamily: fonts.GilroyBold,
      color: "fontBlack",
    },
    lastChatUnread: {
      fontSize: 13,
      lineHeight: 19,
      fontFamily: fonts.GilroyMedium,
      color: "bluePrimary",
    },
    lastChat: {
      fontSize: 13,
      lineHeight: 19,
      fontFamily: fonts.GilroyMedium,
      color: "darkGray",
    },
    sidebarMenu: {
      fontSize: 17,
      lineHeight: 23,
      fontFamily: fonts.GilroySemiBold,
      color: "bluePrimary",
    },
    scrollSelectorActive: {
      fontSize: 18,
      lineHeight: 24,
      fontFamily: fonts.GilroySemiBold,
      color: "white",
      textAlign: "center",
      textAlignVertical: "center",
    },
    scrollSelector: {
      fontSize: 18,
      lineHeight: 24,
      fontFamily: fonts.GilroySemiBold,
      color: "fontBlack",
      textAlign: "center",
      textAlignVertical: "center",
    },
    profileMenu: {
      fontSize: 20,
      lineHeight: 24,
      fontFamily: fonts.GilroyBold,
      color: "fontBlack",
    },
    profileSubmenu: {
      fontSize: 17,
      lineHeight: 21,
      fontFamily: fonts.GilroySemiBold,
      color: "fontBlack",
    },
    profileSubmenu2: {
      fontSize: 14,
      lineHeight: 24,
      fontFamily: fonts.GilroySemiBold,
      color: "darkGray",
      textAlignVertical: "center",
    },
    timestamp: {
      fontSize: 14,
      lineHeight: 24,
      fontFamily: fonts.GilroyMedium,
      color: "darkGray",
      textAlignVertical: "center",
    },
    timestampChatroom: {
      fontSize: 13,
      lineHeight: 24,
      fontFamily: fonts.GilroySemiBold,
      color: "bluePrimary",
      textAlignVertical: "center",
    },
    myChat: {
      fontSize: 13,
      lineHeight: 24,
      fontFamily: fonts.GilroyMedium,
      color: "fontBlack",
    },
    otherChat: {
      fontSize: 13,
      lineHeight: 24,
      fontFamily: fonts.GilroyMedium,
      color: "white",
    },
  },
  borderRadii: {
    s: 10,
    m: 20,
    l: 30,
    xl: 35,
  },
});

export type Theme = typeof theme;
export default theme;
