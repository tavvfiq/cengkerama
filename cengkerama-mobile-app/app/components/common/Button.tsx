import React from 'react';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  LayoutProps,
  BackgroundColorProps,
} from '@shopify/restyle';
import {Pressable, TouchableHighlight, TouchableOpacity as _TouchableOpacity} from 'react-native';
import View from './View';
import {Theme} from '../../theme/default';

const restyleFunctions = [spacing, border, backgroundColor];
type Props = LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress?: () => void;
    children: React.ReactNode;
  };

export const Button = ({onPress, children, ...rest}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        overflow: 'hidden',
        backgroundColor: rest.backgroundColor?.toString(),
      }}>
      <View {...props}>{children}</View>
    </TouchableHighlight>
  );
};

export const BorderlessButton = ({onPress, children, ...rest}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <Pressable onPress={onPress}>
      <View {...props}>{children}</View>
    </Pressable>
  );
};

export const TouchableOpacity = ({onPress, children, ...rest}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <_TouchableOpacity onPress={onPress}>
      <View {...props}>{children}</View>
    </_TouchableOpacity>
  );
};
