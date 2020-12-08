import React from "react";
import { Dimensions, FlatList } from "react-native";

import { separateArray } from "../../utils/array";
import { View } from "../common";

import Card from "./Card";

const { width } = Dimensions.get("window");

interface Props {
  data?: Array<{ [key: string]: unknown }>;
  onReachEnd?: () => void;
}

const Thumbnail = ({ data, onReachEnd }: Props) => {
  const handleOnReachEnd = () => {
    if (onReachEnd) {
      onReachEnd();
    }
  };
  const _data = separateArray(data, 3);
  return (
    <FlatList
      data={_data}
      renderItem={({ item, index }) => {
        return (
          <View
            flex={1}
            key={index}
            flexDirection="row"
            justifyContent="flex-start"
          >
            {item.map((element) => {
              return <Card key={element.id as string} {...element} />;
            })}
          </View>
        );
      }}
      keyExtractor={(item, index) => String(index)}
      onEndReached={handleOnReachEnd}
      onEndReachedThreshold={0.1}
      contentContainerStyle={{ width, paddingHorizontal: 20 }}
    />
  );
};

export default Thumbnail;
