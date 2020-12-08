import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { ScrollbarItems } from "../../interface";
import { View } from "../common";
import AnimatedView from "../common/AnimatedView";

import Bar from "./Bar";

const styles = StyleSheet.create({
  scrollviewContainer: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    alignItems: "center",
  },
});

interface Props {
  scrollbaritems: ScrollbarItems[];
  barWidth: number;
  barHeight: number;
}

const ScrollBar = ({ scrollbaritems, barWidth, barHeight }: Props) => {
  const [currentIndex, setIndex] = useState<number>(0);
  const xPosition = useSharedValue<number>(0);
  const handleOnPress = (index: number) => {
    xPosition.value += (index - currentIndex) * barWidth;
    setIndex(index);
  };
  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: barWidth,
      height: barHeight,
      marginLeft: 28,
      overflow: "hidden",
      transform: [{ translateX: withTiming(xPosition.value) }],
    };
  });
  return (
    <View height={43} marginBottom="m">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollviewContainer}
      >
        <AnimatedView
          animatedStyle={style}
          width="100%"
          height="100%"
          borderRadius="m"
          backgroundColor="bluePrimary"
        />
        {scrollbaritems.map((bar, index) => {
          return (
            <Bar
              key={index}
              onPress={handleOnPress}
              {...{ label: bar.label, currentIndex, index }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ScrollBar;
