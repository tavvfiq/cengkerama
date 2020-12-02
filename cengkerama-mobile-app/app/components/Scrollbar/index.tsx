import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../constant';
import {View} from '../common';
import AnimatedView from '../common/AnimatedView';
import Bar from './Bar';

const bars = [
  {label: 'All'},
  {label: 'Important'},
  {label: 'Unread'},
  {label: 'Read'},
];

interface Props {}

const BAR_WIDTH = 115;
const BAR_HEIGHT = 43;

const ScrollBar = (props: Props) => {
  const [currentIndex, setIndex] = useState<number>(0);
  const xPosition = useSharedValue<number>(0);
  const handleOnPress = (index: number) => {
    xPosition.value += (index - currentIndex) * BAR_WIDTH;
    setIndex(index);
  };
  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(xPosition.value)}],
    };
  });
  return (
    <View height={43}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 28,
          paddingVertical: 12,
          alignItems: 'center',
        }}>
        <AnimatedView
          animatedStyle={[
            {
              position: 'absolute',
              width: BAR_WIDTH,
              height: BAR_HEIGHT,
              marginLeft: 28,
              overflow: 'hidden',
            },
            style,
          ]}
          width="100%"
          height="100%"
          borderRadius='m'
          backgroundColor="bluePrimary"
        />
        {bars.map((bar, index) => {
          return (
            <Bar
              key={index}
              onPress={handleOnPress}
              {...{label: bar.label, currentIndex, index}}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ScrollBar;
