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
  ActivityIndicator,
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
    loading?: boolean;
    containerStyle?: ViewStyle;
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
  disabled,
  loading,
  containerStyle,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      style={({ pressed }) => ({
        ...containerStyle,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <View {...props}>
        {loading ? (
          <ActivityIndicator
            color="white"
            size="small"
            style={{ alignSelf: "center" }}
          />
        ) : (
          children
        )}
      </View>
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
