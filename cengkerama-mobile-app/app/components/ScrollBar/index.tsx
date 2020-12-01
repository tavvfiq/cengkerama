import React, {useState} from 'react';
import {ScrollView} from 'react-native';
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
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 28,
        paddingVertical: 12,
        height: 43,
        alignItems:"center",
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
  );
};

export default ScrollBar;
