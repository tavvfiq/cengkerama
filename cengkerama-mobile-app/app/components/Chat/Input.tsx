import React, { useEffect, useState } from "react";
import { Dimensions, TextInput, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";

import { Text, TouchableOpacity, View } from "../common";
import { colors, fonts } from "../../constant";
import Thumbnail from "../Thumbnail/Thumbnail";
import useCameraRoll from "../../hooks/useCameraRoll";

import ImageIcon from "./Icons/Image";
import DocumentIcon from "./Icons/Document";
import ContactIcon from "./Icons/Contact";
import LocationIcon from "./Icons/Location";

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

interface AttachmentProps {
  isActive?: boolean;
  setActive: (name: string) => void;
}

const ATT_HEIGHT = 0.25 * width;

const AttachmentPicker = ({ isActive, setActive }: AttachmentProps) => {
  const translateY = useSharedValue<number>(0);
  const AttchmentItems = [
    {
      label: "Image",
      icon: <ImageIcon />,
      onPress: () => {
        setActive("image");
      },
    },
    {
      label: "Documents",
      icon: <DocumentIcon />,
      onPress: () => {
        Alert.alert(
          "WIP feature",
          "yeay, you found a work in progress feature!",
        );
      },
    },
    {
      label: "Contacts",
      icon: <ContactIcon />,
      onPress: () => {
        Alert.alert(
          "WIP feature",
          "yeay, you found a work in progress feature!",
        );
      },
    },
    {
      label: "Location",
      icon: <LocationIcon />,
      onPress: () => {
        Alert.alert(
          "WIP feature",
          "yeay, you found a work in progress feature!",
        );
      },
    },
  ];

  useEffect(() => {
    if (isActive) {
      translateY.value = 0;
    }
  }, [isActive]);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationY }) => {
      translateY.value = translationY;
    },
    onEnd: ({ velocityY }) => {
      const hide =
        snapPoint(translateY.value, velocityY, [0, ATT_HEIGHT]) === ATT_HEIGHT;
      if (hide) {
        // setActive();
        runOnJS(setActive)("parent");
      } else {
        translateY.value = withTiming(0);
      }
    },
  });
  const styles = useAnimatedStyle(() => {
    const transY = interpolate(
      translateY.value,
      [0, ATT_HEIGHT],
      [0, ATT_HEIGHT],
      Extrapolate.CLAMP,
    );
    return {
      flex: 1,
      position: "absolute",
      bottom: 0,
      height: withTiming(isActive ? ATT_HEIGHT : 0),
      elevation: 3,
      overflow: "hidden",
      transform: [{ translateY: transY }],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={styles}>
        <View
          flex={1}
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="center"
          paddingVertical="l"
          position="relative"
          backgroundColor="white"
          width={width}
          height={ATT_HEIGHT}
          elevation={3}
        >
          {AttchmentItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                flex={1}
                alignSelf="center"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                onPress={item.onPress}
              >
                {item.icon}
                <Text variant="lastChatUnread">{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

interface ImageContainerProps {
  isActive?: boolean;
  setActive: (what: string) => void;
}

const _data = [
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
  {
    id: "5",
  },
  {
    id: "6",
  },
  {
    id: "7",
  },
  {
    id: "8",
  },
  {
    id: "9",
  },
];

const THUMBNAIL_SIZE = 0.25 * width;
const PADDING = 16;

const MAX_HEIGHT = THUMBNAIL_SIZE * 3 + PADDING;

const ImageContainer = ({ isActive, setActive }: ImageContainerProps) => {
  const [image, func] = useCameraRoll();
  const translateY = useSharedValue<number>(0);
  useEffect(() => {
    if (isActive) {
      translateY.value = 0;
    }
  }, [isActive]);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationY }) => {
      translateY.value = translationY;
    },
    onEnd: ({ velocityY }) => {
      const hide =
        snapPoint(translateY.value, velocityY, [0, MAX_HEIGHT]) === MAX_HEIGHT;
      if (hide) {
        runOnJS(setActive)("image");
      } else {
        translateY.value = withTiming(0);
      }
    },
  });
  const style = useAnimatedStyle(() => {
    const transY = interpolate(
      translateY.value,
      [0, MAX_HEIGHT],
      [0, MAX_HEIGHT],
      Extrapolate.CLAMP,
    );
    return {
      position: "absolute",
      bottom: 0,
      elevation: 3,
      height: withTiming(isActive ? MAX_HEIGHT : 0),
      transform: [{ translateY: transY }],
    };
  });
  return (
    <Animated.View style={style}>
      <View backgroundColor="white" height="100%" elevation={3}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View>
            <View
              paddingHorizontal="xl"
              paddingVertical="s"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text variant="profileMenu" style={{ alignSelf: "center" }}>
                Image
              </Text>
              <TouchableOpacity alignSelf="center">
                <Icon name="send" color={colors.bluePrimary} size={24} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </PanGestureHandler>
        <Thumbnail data={image} />
      </View>
    </Animated.View>
  );
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
      <ImageContainer isActive={isActive.image} setActive={handleAttchment} />
    </>
  );
};

export default Input;
