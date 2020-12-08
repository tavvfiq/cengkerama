import React, { useEffect } from "react";
import { Alert, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { PanGestureHandler } from "react-native-gesture-handler";

import ImageIcon from "../Icons/Image";
import DocumentIcon from "../Icons/Document";
import ContactIcon from "../Icons/Contact";
import LocationIcon from "../Icons/Location";
import { Text, TouchableOpacity, View } from "../../common";

const { width } = Dimensions.get("window");

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

export default AttachmentPicker;
