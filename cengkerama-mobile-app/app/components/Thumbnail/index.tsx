import React from "react";
import { Dimensions, FlatList, ListRenderItem } from "react-native";

import { separateArray } from "../../utils/array";
import { View } from "../common";

import Card from "./Card";

const { width } = Dimensions.get("window");

interface Props {
  data: Array<{ [key: string]: unknown }>;
  onReachEnd?: () => void;
  cardOnLongPress?: (payload: string) => boolean;
}

const Thumbnail = ({ data, onReachEnd, cardOnLongPress }: Props) => {
  const handleOnReachEnd = () => {
    if (onReachEnd) {
      onReachEnd();
    }
  };

  const renderItems: ListRenderItem<{ [key: string]: unknown } | unknown> = ({
    item,
    index,
  }) => {
    return (
      <View
        flex={1}
        key={index}
        flexDirection="row"
        justifyContent="flex-start"
      >
        {item.map((element) => {
          return (
            <Card
              key={element.id as string}
              {...element}
              onLongPress={cardOnLongPress}
            />
          );
        })}
      </View>
    );
  };

  const _data = separateArray(data as { [key: string]: unknown }[], 3);
  return (
    <FlatList
      data={_data ? _data : []}
      renderItem={renderItems}
      keyExtractor={(item, index) => String(index)}
      onEndReached={handleOnReachEnd}
      onEndReachedThreshold={0.1}
      contentContainerStyle={{ width, paddingHorizontal: 20 }}
    />
  );
};

export default Thumbnail;
