/* eslint-disable react-native/split-platform-components */
import React, { useState } from "react";
import {
  Image,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  Platform,
} from "react-native";
import dayjs from "dayjs";
import { SharedElement } from "react-navigation-shared-element";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Clipboard from "@react-native-community/clipboard";

import { MessageProps } from "../../interface";
import { BorderlessButton, Text, View } from "../common";
import { colors } from "../../constant";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  avatar: {
    width: 0.5 * width,
    height: 0.5 * width,
    borderRadius: 14,
  },
  mybubble: {
    color: colors.fontBlack,
    width: "100%",
    textAlign: "right",
  },
  bubble: { width: "100%" },
});

type Props = MessageProps & {
  onPress?: (id: string, messageText: string) => void;
};

const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravity(
      "copied",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  }
};

export const Bubble = ({ id, messageText, isImage, sentAt }: Props) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);
  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });
  const handleOnPress = () => {
    if (isImage) {
      setOpacity(0);
      navigation.navigate("ImageView", { id, messageText });
    }
  };
  const handleLongPress = () => {
    if (!isImage) {
      copyToClipboard(messageText as string);
    }
  };
  return (
    <>
      <BorderlessButton
        flex={1}
        onPress={handleOnPress}
        onLongPress={handleLongPress}
      >
        <View
          borderTopLeftRadius="l"
          borderTopRightRadius="l"
          borderBottomRightRadius="l"
          borderBottomLeftRadius="s"
          padding={isImage ? undefined : "s"}
          alignSelf="flex-start"
          overflow="hidden"
          maxWidth={0.79 * width}
          backgroundColor="chatBgSecondary"
        >
          {isImage ? (
            <View
              borderTopLeftRadius="l"
              borderTopRightRadius="l"
              borderBottomRightRadius="s"
              borderBottomLeftRadius="l"
              overflow="hidden"
              maxWidth={0.5 * width}
              maxHeight={0.5 * width}
            >
              <SharedElement id={id as string}>
                <Image
                  source={{ uri: messageText }}
                  style={[styles.avatar, { opacity }]}
                />
              </SharedElement>
            </View>
          ) : (
            <Text variant="otherChat">{messageText}</Text>
          )}
        </View>
      </BorderlessButton>
      <Text variant="timestampChatroom" style={styles.bubble}>
        {dayjs(sentAt).format("hh:mm a")}
      </Text>
    </>
  );
};
export const MyBubble = ({ id, messageText, isImage, sentAt }: Props) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);
  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });
  const handleOnPress = () => {
    if (isImage) {
      setOpacity(0);
      navigation.navigate("ImageView", { id, messageText });
    }
  };

  const handleLongPress = () => {
    if (!isImage) {
      copyToClipboard(messageText as string);
    }
  };

  return (
    <>
      <BorderlessButton
        flex={1}
        onPress={handleOnPress}
        onLongPress={handleLongPress}
      >
        <View
          borderTopLeftRadius="l"
          borderTopRightRadius="l"
          borderBottomRightRadius="s"
          borderBottomLeftRadius="l"
          padding={isImage ? undefined : "s"}
          alignSelf="flex-end"
          overflow="hidden"
          maxWidth={0.79 * width}
          backgroundColor="chatBgMain"
        >
          {isImage ? (
            <View
              borderTopLeftRadius="l"
              borderTopRightRadius="l"
              borderBottomRightRadius="s"
              borderBottomLeftRadius="l"
              overflow="hidden"
              maxWidth={0.5 * width}
              maxHeight={0.5 * width}
            >
              <SharedElement id={id as string}>
                <Image
                  source={{ uri: messageText }}
                  style={[styles.avatar, { opacity }]}
                />
              </SharedElement>
            </View>
          ) : (
            <Text variant="myChat">{messageText}</Text>
          )}
        </View>
      </BorderlessButton>
      <Text variant="timestampChatroom" style={styles.mybubble}>
        {dayjs(sentAt).format("hh:mm a")}
      </Text>
    </>
  );
};
