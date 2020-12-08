import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
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
import Icon from "react-native-vector-icons/Ionicons";

import { colors } from "../../../constant";
import useCameraRoll from "../../../hooks/useCameraRoll";
import { Text, TouchableOpacity, View } from "../../common";
import Thumbnail from "../../Thumbnail/Thumbnail";

const { width } = Dimensions.get("window");

interface ImageContainerProps {
  isActive?: boolean;
  setActive: (what: string) => void;
}

const THUMBNAIL_SIZE = 0.25 * width;
const PADDING = 16;

const MAX_HEIGHT = THUMBNAIL_SIZE * 3 + PADDING;

const ImageInput = ({ isActive, setActive }: ImageContainerProps) => {
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

export default ImageInput;
