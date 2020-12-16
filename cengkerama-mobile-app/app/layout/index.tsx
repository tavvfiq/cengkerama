import React from "react";
import { StatusBar, StatusBarStyle } from "react-native";

import { View } from "../components/common";

type LayoutProps = {
  children: React.ReactNode;
  statusbarTheme?: {
    backgroundColor: string;
    barStyle: StatusBarStyle;
  };
};

const Layout = ({ children, statusbarTheme }: LayoutProps) => {
  const theme = statusbarTheme || {
    backgroundColor: "white",
    barStyle: "dark-content",
  };
  return (
    <View backgroundColor="white" flex={1}>
      <StatusBar {...theme} />
      {children}
    </View>
  );
};

export default Layout;
