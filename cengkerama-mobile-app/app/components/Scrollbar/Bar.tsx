import React from 'react';
import {Text, TouchableOpacity} from '../common';

interface BarProps {
  currentIndex: number;
  index: number;
  label: string;
  onPress: (index: number) => void;
}

const BAR_WIDTH = 115;
const BAR_HEIGHT = 43;

const Bar = ({index, currentIndex, label, onPress}: BarProps) => {
  const isActive = index === currentIndex;
  return (
    <TouchableOpacity
      backgroundColor="none"
      width={BAR_WIDTH}
      height={BAR_HEIGHT}
      onPress={() => {
        onPress(index);
      }}
      justifyContent="center"
      alignItems="center"
      borderRadius="m">
      <Text variant={isActive ? 'scrollSelectorActive' : 'scrollSelector'}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Bar;
