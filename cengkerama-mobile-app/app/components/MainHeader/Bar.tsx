import React, { useEffect } from "react";
import { Alert, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { TouchableOpacity, View } from "../common";

import Channel from "./Icons/Channel";
import Group from "./Icons/Group";
import Private from "./Icons/Private";

interface Props {
  isOpened?: boolean;
  newChannel?: () => void;
  newPrivate?: () => void;
  newGroup?: () => void;
}

const { width } = Dimensions.get("window");

const BAR_WIDTH = 0.52 * width;
const BAR_HEIGHT = 0.12 * width;

const Bar = ({ isOpened }: Props) => {
  const barWidth = useSharedValue<number>(0);

  useEffect(() => {
    if (isOpened) {
      barWidth.value = BAR_WIDTH;
    } else {
      barWidth.value = 0;
    }
  }, [isOpened]);
  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(barWidth.value),
      position: "absolute",
      overflow: "hidden",
      height: BAR_HEIGHT,
      top: 14,
      flex: 1,
      left: 28,
      direction: "rtl",
    };
  });
  return (
    <Animated.View style={style}>
      <View
        flex={1}
        width={BAR_WIDTH}
        height="100%"
        flexDirection="row"
        backgroundColor="bluePrimary"
        justifyContent="space-evenly"
        borderRadius="m"
        alignItems="center"
      >
        <TouchableOpacity alignSelf="center">
          <Group />
        </TouchableOpacity>
        <TouchableOpacity alignSelf="center">
          <Private />
        </TouchableOpacity>
        <TouchableOpacity
          alignSelf="center"
          onPress={() =>
            Alert.alert(
              "WIP feature",
              "yeay, you found a work in progress feature!",
            )
          }
        >
          <Channel />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Bar;
