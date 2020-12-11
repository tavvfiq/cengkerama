import React from "react";
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  LayoutProps,
  BackgroundColorProps,
} from "@shopify/restyle";
import {
  Pressable,
  TouchableHighlight,
  TouchableOpacity as _TouchableOpacity,
  ViewStyle,
} from "react-native";

import { Theme } from "../../theme/default";

import View from "./View";

const restyleFunctions = [spacing, border, backgroundColor];
type Props = LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress?: () => void;
    onLongPress?: () => void;
    children: React.ReactNode;
    style?: ViewStyle;
    disabled?: boolean;
  };

export const Button = ({ onPress, children, ...rest }: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        overflow: "hidden",
        backgroundColor: rest.backgroundColor?.toString(),
      }}
    >
      <View {...props}>{children}</View>
    </TouchableHighlight>
  );
};

export const BorderlessButton = ({
  onPress,
  onLongPress,
  children,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
    >
      <View {...props}>{children}</View>
    </Pressable>
  );
};

export const TouchableOpacity = ({
  onPress,
  children,
  disabled,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <_TouchableOpacity onPress={onPress} disabled={disabled || false}>
      <View {...props}>{children}</View>
    </_TouchableOpacity>
  );
};
