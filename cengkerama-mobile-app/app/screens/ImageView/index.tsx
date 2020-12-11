import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
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
    alignSelf: "center",
    resizeMode: "contain",
  },
});

interface Props {
  navigation: StackNavigationProp<AppStackParams, "ImageView">;
  route: RouteProp<AppStackParams, "ImageView">;
}

const ImageView = ({ navigation, route }: Props) => {
  const { id, data } = route.params;
  const { uri, width: _width, height: _height } = JSON.parse(data as string);
  const isScaleActive = useSharedValue<boolean>(false);
  const lastScale = useSharedValue<number>(1);
  const translateX = useSharedValue<number>(0);
  const lastTranslateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const lastTranslateY = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);
  const doGoBack = () => {
    navigation.goBack();
  };
  const onPinchEvent = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>(
    {
      onStart: () => {
        if (lastScale.value > 1) {
          isScaleActive.value = true;
        }
      },
      onActive: (event) => {
        scale.value = lastScale.value * event.scale;
      },
      onEnd: () => {
        if (scale.value < 1) {
          scale.value = withTiming(1);
          isScaleActive.value = false;
        }
      },
      onFinish: () => {
        lastScale.value = scale.value;
        if (scale.value <= 1) {
          isScaleActive.value = false;
          translateX.value = withTiming(0);
          translateY.value = withTiming(0);
        }
      },
    },
  );
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      lastTranslateX.value = translateX.value;
      lastTranslateY.value = translateY.value;
    },
    onActive: ({ translationX, translationY }) => {
      if (isScaleActive.value) {
        translateX.value = interpolate(
          lastTranslateX.value + translationX,
          [
            -(width * lastScale.value - width) / 2,
            (width * lastScale.value - width) / 2,
          ],
          [
            -(width * lastScale.value - width) / 2,
            (width * lastScale.value - width) / 2,
          ],
          Extrapolate.CLAMP,
        );
        translateY.value = interpolate(
          lastTranslateY.value + translationY,
          [
            -(height * lastScale.value - height) / 2,
            (height * lastScale.value - height) / 2,
          ],
          [
            -(height * lastScale.value - height) / 2,
            (height * lastScale.value - height) / 2,
          ],
          Extrapolate.CLAMP,
        );
      } else {
        translateY.value = lastTranslateY.value + translationY;
      }
    },
    onEnd: ({ velocityY }) => {
      const goBack =
        snapPoint(translateY.value, velocityY, [0, height]) === height;
      if (!isScaleActive.value) {
        if (goBack) {
          runOnJS(doGoBack)();
        } else {
          translateY.value = withTiming(0);
        }
      }
    },
  });
  const style = useAnimatedStyle(() => {
    const _scale = interpolate(
      translateY.value,
      [0, height],
      [1, 0.4],
      Extrapolate.CLAMP,
    );
    return {
      flex: 1,
      transform: [
        { translateX: translateX.value },
        {
          translateY: isScaleActive.value
            ? translateY.value
            : translateY.value * _scale,
        },
        { scale: scale.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        <PinchGestureHandler onGestureEvent={onPinchEvent}>
          <Animated.View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <SharedElement id={id}>
              <Animated.Image
                source={{ uri: uri }}
                style={[
                  styles.imageStyle,
                  { width: _width || width, height: _height || height },
                ]}
              />
            </SharedElement>
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ImageView;
