import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, View} from '../common';

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
    <>
      <View
        backgroundColor={isActive ? 'bluePrimary' : 'white'}
        width={BAR_WIDTH}
        height={BAR_HEIGHT}
        borderRadius="m">
        <TouchableOpacity
          onPress={() => {
            onPress(index);
          }}
          style={{
            alignItems: 'center',
            height: '100%',
          }}>
          <Text variant={isActive ? 'scrollSelectorActive' : 'scrollSelector'}>
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Bar;
