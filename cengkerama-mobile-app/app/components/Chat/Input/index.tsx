import React, { useRef, useState } from "react";
import { Dimensions, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { TouchableOpacity, View } from "../../common";
import { colors, fonts } from "../../../constant";
import { ImageType } from "../../../interface";

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
  onSend?: (type: string, messageText?: string, imagePayload?: string) => void;
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
  const [isActive, setActive] = useState<{ [key: string]: boolean }>(
    attachState,
  );
  const selectedImage = useRef<ImageType[]>([]);

  const addOrRemoveImage = (payload: string): boolean => {
    const image: ImageType = JSON.parse(payload);
    const isSelected = selectedImage.current.findIndex((item) => {
      return item.uri === image.uri;
    });
    if (isSelected < 0) {
      // console.log("Image added");
      // doesn't exist, add it
      selectedImage.current.push(image);
      return true;
    } else {
      // console.log("Image removed");
      // exist, remove it
      selectedImage.current.splice(isSelected, 1);
      return false;
    }
  };

  // send handler
  const send = () => {
    try {
      if (onSend) {
        if (selectedImage.current.length > 0) {
          const payload = JSON.stringify(selectedImage.current);
          onSend("image", messageText, payload);
          selectedImage.current = [];
        } else {
          onSend("text", messageText);
          setMessage("");
        }
      }
    } catch (error) {
      console.error(error);
    }
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
      <ImageInput
        isActive={isActive.image}
        setActive={handleAttchment}
        imageOnLongPress={addOrRemoveImage}
        onSend={send}
      />
    </>
  );
};

export default Input;
