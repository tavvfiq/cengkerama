import React from 'react';
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
} from '@shopify/restyle';
import {StyleProp, ViewProps, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {Theme} from '../../theme/default';
import View from './View';

const restyleFunctions = [spacing, border, backgroundColor];
type AnimatedViewProps = LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    animatedStyle?: StyleProp<ViewStyle>;
    viewStyle?: StyleProp<ViewProps>;
    children?: React.ReactNode;
  };

const AnimatedView = ({
  animatedStyle,
  viewStyle: style,
  children,
  ...rest
}: AnimatedViewProps) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <Animated.View style={animatedStyle || {}}>
      <View style={style || {}} {...props}>
        {children}
      </View>
    </Animated.View>
  );
};

export default AnimatedView;
