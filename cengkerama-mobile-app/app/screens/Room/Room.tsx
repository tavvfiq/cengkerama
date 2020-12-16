import React, { useRef } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
// import ImageResizer from "react-native-image-resizer";

import { Bubble, Header, MyBubble, Input } from "../../components/Chat";
import { AppStackParams, MessageProps, RoomProps } from "../../interface";
import Layout from "../../layout";
import { Text, View } from "../../components/common";
import { colors } from "../../constant";
import useMessage from "../../hooks/useMessage";

// const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingTop: 14,
    paddingHorizontal: 28,
  },
  dateStyle: {
    color: colors.fontBlack,
    textAlign: "center",
  },
});

type Props = {
  navigation: StackNavigationProp<AppStackParams, "Room">;
  route: RouteProp<AppStackParams, "Room">;
};

// const containerHeight = height - 0.14 * width;

const myId = "123456";

const Room = ({ navigation, route }: Props) => {
  const { id: roomId }: RoomProps = JSON.parse(route.params.payload);

  // useMessage hooks
  const [messages, sendMessage] = useMessage(roomId, myId);

  const date = useRef<string>("");

  const handleSend = (type: string, messageText?: string, payload?: string) => {
    sendMessage(type, messageText, payload);
  };

  // render flatlist item
  const renderItems: ListRenderItem<MessageProps> = ({ item, index }) => {
    let isSameDate = true;
    let _date = "";
    if (index === 0) {
      date.current = dayjs(item.sentAt as string).format("YYYY-MM-DD");
    } else {
      isSameDate =
        date.current === dayjs(item.sentAt as string).format("YYYY-MM-DD");
      if (!isSameDate) {
        _date = date.current;
        date.current = dayjs(item.sentAt as string).format("YYYY-MM-DD");
      }
    }
    let lastIndex = false;
    if (messages) {
      lastIndex = index === messages?.length - 1;
    }
    return (
      <View key={index}>
        {lastIndex && (
          <Text variant="timestamp" marginBottom="s" style={styles.dateStyle}>
            {dayjs(item.sentAt).format("ddd, D MMMM YYYY")}
          </Text>
        )}
        {item.sentBy === myId ? (
          <MyBubble key={item.id} {...item} />
        ) : (
          <Bubble key={item.id} {...item} />
        )}
        {!isSameDate && (
          <Text variant="timestamp" marginBottom="s" style={styles.dateStyle}>
            {dayjs(_date).format("ddd, D MMMM YYYY")}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Layout>
      <Header backOnPress={() => navigation.goBack()} />
      <View flex={1}>
        {messages?.length !== 0 && (
          <FlatList
            contentContainerStyle={styles.flatlistContainer}
            data={messages}
            renderItem={renderItems}
            keyExtractor={(item) => item.id as string}
            inverted
          />
        )}
      </View>
      <Input onSend={handleSend} />
    </Layout>
  );
};

export default Room;
