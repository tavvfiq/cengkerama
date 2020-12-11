/* eslint-disable react-native/split-platform-components */
import React, { useState } from "react";
import {
  Image,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  Platform,
  Linking,
  ActivityIndicator,
} from "react-native";
import dayjs from "dayjs";
import { SharedElement } from "react-navigation-shared-element";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Clipboard from "@react-native-community/clipboard";

import { MessageProps } from "../../interface";
import { BorderlessButton, Text, View } from "../common";
import { colors, linkRegx } from "../../constant";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  avatar: {
    width: 0.5 * width,
    height: 0.5 * width,
    borderRadius: 14,
    resizeMode: "cover",
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

export const Bubble: React.FunctionComponent<Props> = ({
  id,
  messageText,
  type,
  sentAt,
}: Props) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);
  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });

  const isLink = messageText?.match(linkRegx);

  const handleOnPress = () => {
    if (type === "image") {
      setOpacity(0);
      navigation.navigate("ImageView", {
        id,
        data: JSON.stringify({ uri: messageText }),
      });
    } else if (isLink) {
      Linking.openURL(messageText as string);
    }
  };
  const handleLongPress = () => {
    if (type === "text") {
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
          padding={type !== "text" ? undefined : "s"}
          alignSelf="flex-start"
          overflow="hidden"
          maxWidth={0.79 * width}
          backgroundColor="chatBgSecondary"
        >
          {type === "image" ? (
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
            <Text variant="otherChat" style={isLink && { color: "skyblue" }}>
              {messageText}
            </Text>
          )}
        </View>
      </BorderlessButton>
      {sentAt ? (
        <Text variant="timestampChatroom" style={styles.bubble}>
          {dayjs(sentAt).format("hh:mm a")}
        </Text>
      ) : (
        <ActivityIndicator
          size="small"
          color={colors.bluePrimary}
          style={{ alignSelf: "flex-start" }}
        />
      )}
    </>
  );
};
export const MyBubble: React.FunctionComponent<Props> = ({
  id,
  messageText,
  type,
  sentAt,
}: Props) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);
  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });

  const isLink = messageText?.match(linkRegx);

  const handleOnPress = () => {
    if (type === "image") {
      setOpacity(0);
      navigation.navigate("ImageView", {
        id,
        data: JSON.stringify({ uri: messageText }),
      });
    } else if (isLink) {
      Linking.openURL(messageText as string);
    }
  };

  const handleLongPress = () => {
    if (type === "text") {
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
          padding={type !== "text" ? undefined : "s"}
          alignSelf="flex-end"
          overflow="hidden"
          maxWidth={0.79 * width}
          backgroundColor="chatBgMain"
        >
          {type === "image" ? (
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
            <Text variant="myChat" style={isLink && { color: "skyblue" }}>
              {messageText}
            </Text>
          )}
        </View>
      </BorderlessButton>
      {sentAt ? (
        <Text variant="timestampChatroom" style={styles.mybubble}>
          {dayjs(sentAt).format("hh:mm a")}
        </Text>
      ) : (
        <ActivityIndicator
          size="small"
          color={colors.fontBlack}
          style={{ alignSelf: "flex-end" }}
        />
      )}
    </>
  );
};
