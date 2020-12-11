import React, { useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { BorderlessButton, View } from "../common";
import { colors } from "../../constant";

const { width } = Dimensions.get("window");

interface Props {
  id: string;
  content: { [key: string]: string | number };
  onLongPress?: (id: string) => boolean;
}

const THUMBNAIL_SIZE = 0.27 * width;

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 20,
    height: THUMBNAIL_SIZE,
    width: THUMBNAIL_SIZE,
    resizeMode: "cover",
  },
});

const Card = ({ id, content, onLongPress }: Props) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState<number>(1);
  const [isSelected, setSelected] = useState<boolean>(false);
  useFocusEffect(() => {
    setOpacity(1);
  });
  const handleOnLongPress = () => {
    if (onLongPress) {
      setSelected(() => onLongPress(JSON.stringify(content)));
    }
  };
  const handleOnPress = () => {
    setOpacity(0);
    navigation.navigate("ImageView", { id, data: JSON.stringify(content) });
  };
  return (
    <BorderlessButton
      maxHeight={THUMBNAIL_SIZE}
      maxWidth={THUMBNAIL_SIZE}
      overflow="hidden"
      borderRadius="s"
      onPress={handleOnPress}
      onLongPress={handleOnLongPress}
      style={{ marginBottom: 6, marginHorizontal: 6 }}
    >
      <SharedElement id={id}>
        <Image
          source={{ uri: content.uri as string }}
          style={[styles.imageStyle, { opacity }]}
        />
      </SharedElement>
      {isSelected && (
        <View
          borderRadius="m"
          height={THUMBNAIL_SIZE}
          width={THUMBNAIL_SIZE}
          position="absolute"
          top={0}
          style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Icon
            name="checkmark-circle"
            size={32}
            color={colors.bluePrimary}
            style={{ alignSelf: "center" }}
          />
        </View>
      )}
    </BorderlessButton>
  );
};

export default Card;
