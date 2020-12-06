import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import Layout from "../../layout";
import Header from "../../components/MainHeader";
import Scrollbar from "../../components/Scrollbar";
import Sidebar from "../../components/Sidebar";
import { AppStackParams, RoomProps } from "../../interface";
import Card from "../../components/Chat/Card";
import useRoom from "../../hooks/useRoom";

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingBottom: 14,
  },
});
interface Props {
  navigation: StackNavigationProp<AppStackParams, "Main">;
}

const myId = "12345";

const Main = ({ navigation }: Props) => {
  const [isActive, setSidebar] = useState<boolean>(false);
  const rooms = useRoom(myId);

  // sidebar icon handler
  const moreOnPress = useCallback(() => {
    setSidebar((prevValue) => !prevValue);
  }, [setSidebar]);

  const cardOnPress = (payload: string) => {
    navigation.navigate("Room", { payload });
  };

  // render rooms on flatlist
  const renderRooms: ListRenderItem<RoomProps> = ({ item }) => {
    return <Card key={item.id} {...item} onPress={cardOnPress} />;
  };

  return (
    <Layout>
      <Header moreOnPress={moreOnPress} />
      <Scrollbar />
      <Sidebar isActive={isActive} backOnPress={moreOnPress} />
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={rooms}
        renderItem={renderRooms}
      />
    </Layout>
  );
};

export default Main;
