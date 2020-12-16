import React from "react";

import { Text, View } from "../../components/common";
import { colors } from "../../constant";
import Layout from "../../layout";

const SplashScreen = () => {
  return (
    <Layout
      statusbarTheme={{
        backgroundColor: colors.bluePrimary,
        barStyle: "light-content",
      }}
    >
      <View
        flex={1}
        flexDirection="column"
        justifyContent="center"
        backgroundColor="bluePrimary"
      >
        <Text variant="bannerSplash" style={{ paddingLeft: 70 }}>
          cengke-
        </Text>
        <Text
          variant="bannerSplash"
          style={{ alignSelf: "flex-end", paddingRight: 70 }}
        >
          rama
        </Text>
      </View>
    </Layout>
  );
};

export default SplashScreen;
