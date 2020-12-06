import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { SharedElement } from "react-navigation-shared-element";

import { AppStackParams } from "../../interface";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  imageStyle: {
    maxWidth: width,
    maxHeight: height,
    resizeMode: "cover",
  },
});

interface Props {
  navigation: StackNavigationProp<AppStackParams, "ImageView">;
  route: RouteProp<AppStackParams, "ImageView">;
}

const ImageView = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const isGestureActive = useSharedValue<boolean>(false);
  const doGoBack = () => {
    navigation.goBack();
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = translationX;
      translateY.value = translationY;
    },
    onEnd: ({ velocityY }) => {
      const goBack =
        snapPoint(translateY.value, velocityY, [0, height]) === height;
      if (goBack) {
        runOnJS(doGoBack)();
      } else {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
      isGestureActive.value = false;
    },
  });
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [0, height],
      [1, 0.5],
      Extrapolate.CLAMP,
    );
    return {
      flex: 1,
      transform: [
        { translateX: translateX.value * scale },
        { translateY: translateY.value * scale },
        { scale },
      ],
    };
  });

  const borderStyle = useAnimatedStyle(() => ({
    borderRadius: withTiming(isGestureActive.value ? 24 : 0),
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        <SharedElement id={id}>
          <Animated.Image
            source={require("../../assets/example.jpg")}
            style={styles.imageStyle}
          />
        </SharedElement>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ImageView;
