import React from "react";
import { Image, Dimensions, StyleSheet } from "react-native";

import { Text, TouchableOpacity, View } from "../common";

import Back from "./Icons/Back";
import Menu from "./Icons/Menu";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  imageStyle: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 4,
    alignSelf: "center",
  },
});

interface Props {
  isOnline?: boolean;
  backOnPress?: () => void;
}

const Header = ({ isOnline, backOnPress }: Props) => {
  return (
    <View
      paddingHorizontal="m"
      flexDirection="row"
      alignItems="center"
      paddingVertical="s"
    >
      <TouchableOpacity
        alignSelf="center"
        paddingRight="l"
        onPress={() => {
          if (backOnPress) {
            backOnPress();
          }
        }}
      >
        <Back />
      </TouchableOpacity>
      <View
        flex={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <View flex={1} flexDirection="row" justifyContent="flex-start">
          <Image
            style={styles.imageStyle}
            source={require("../../assets/example.jpg")}
          />
          <TouchableOpacity
            flex={1}
            flexDirection="column"
            justifyContent="center"
            marginLeft="s"
          >
            <Text variant="contactName" numberOfLines={1} ellipsizeMode="tail">
              Mother
            </Text>
            <Text variant={isOnline ? "lastChatUnread" : "lastChat"}>
              Online
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity alignSelf="center">
          <Menu />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
