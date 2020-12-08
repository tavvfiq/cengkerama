import React, { useState } from "react";
import { Dimensions, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { TouchableOpacity, View } from "../../common";
import { colors, fonts } from "../../../constant";

import AttachmentPicker from "./AttachmentInput";
import ImageInput from "./ImageInput";

const { width } = Dimensions.get("window");

const toggleActive = (
  source: { [key: string]: boolean },
  what: string,
): { [key: string]: boolean } => {
  const newState = { ...source };
  for (const key in newState) {
    if (key === what) {
      newState[what] = !source[what];
    } else {
      newState[key] = false;
    }
  }
  return newState;
};

interface Props {
  onSend?: (messageText: string, type: string) => void;
}

const attachState = {
  parent: false,
  image: false,
  document: false,
  contact: false,
  location: false,
};

const Input = ({ onSend }: Props) => {
  const [messageText, setMessage] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, setType] = useState<string>("text");
  const [isActive, setActive] = useState<{ [key: string]: boolean }>(
    attachState,
  );

  // send handler
  const send = () => {
    if (onSend) {
      onSend(messageText, type);
    }
    setMessage("");
  };

  const handleAttchment = (what: string) => {
    const newState = toggleActive(isActive, what);
    setActive(() => newState);
  };

  return (
    <>
      <View
        backgroundColor="white"
        padding="m"
        width={width}
        position="absolute"
        elevation={3}
        bottom={0}
      >
        <View
          width="100%"
          flexDirection="row"
          justifyContent="space-between"
          backgroundColor="gray"
          borderRadius="l"
          minHeight={0.14 * width}
          maxHeight={0.14 * width}
          paddingHorizontal="s"
          alignItems="center"
        >
          <View
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <TouchableOpacity
              onPress={() => {
                handleAttchment("parent");
              }}
            >
              <Icon name="attach" color={colors.bluePrimary} size={24} />
            </TouchableOpacity>
            <TextInput
              style={{ flex: 1, fontFamily: fonts.GilroyMedium }}
              multiline={true}
              placeholder="type your message"
              value={messageText}
              onChangeText={(text) => setMessage(text)}
            />
            <TouchableOpacity alignSelf="center" onPress={send}>
              <Icon name="send" color={colors.bluePrimary} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <AttachmentPicker
        isActive={isActive.parent}
        setActive={handleAttchment}
      />
      <ImageInput isActive={isActive.image} setActive={handleAttchment} />
    </>
  );
};

export default Input;
