import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {View} from '../common';
import Bar from './Bar';

const bars = [
  {label: 'All'},
  {label: 'Important'},
  {label: 'Unread'},
  {label: 'Read'},
];

interface Props {}

const ScrollBar = (props: Props) => {
  const [currentIndex, setIndex] = useState<number>(0);
  const handleOnPress = (index: number) => {
    setIndex(index);
  };
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
