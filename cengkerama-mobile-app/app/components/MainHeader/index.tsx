import React, { useState } from "react";
import { BorderlessButton } from "react-native-gesture-handler";

import { Text, View } from "../common";

import Plus from "./Icons/Plus";
import Search from "./Icons/Search";
import More from "./Icons/More";
import Bar from "./Bar";

interface Props {
  moreOnPress: () => void;
  addOnPress?: () => void;
  searchOnPress?: () => void;
}

const MainHeader = ({ moreOnPress, addOnPress, searchOnPress }: Props) => {
  const [addOpened, openAdd] = useState<boolean>(false);

  return (
    <View
      backgroundColor="white"
      flexDirection="row"
      justifyContent="space-between"
      paddingVertical="m"
    >
      <Text variant="header" paddingLeft="l">
        Cengkerama
      </Text>
      <Bar isOpened={addOpened} />
      <View
        flex={1}
        flexDirection="row"
        justifyContent="flex-end"
        paddingRight="l"
      >
        <BorderlessButton
          style={{ alignSelf: "center", overflow: "visible" }}
          onPress={() => {
            openAdd((prevState) => !prevState);
          }}
        >
          <Plus />
        </BorderlessButton>
        <BorderlessButton
          style={{ alignSelf: "center", marginLeft: 14 }}
          onPress={searchOnPress}
        >
          <Search />
        </BorderlessButton>
        <BorderlessButton
          style={{ alignSelf: "center", marginLeft: 14 }}
          onPress={moreOnPress}
        >
          <More />
        </BorderlessButton>
      </View>
    </View>
  );
};

export default MainHeader;
