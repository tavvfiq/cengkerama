import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, ListRenderItem, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { Bubble, Header, MyBubble, Input } from "../../components/Chat";
import { AppStackParams, MessageProps, RoomProps } from "../../interface";
import Layout from "../../layout";
import { Text, View } from "../../components/common";
import { colors } from "../../constant";
import useMessage from "../../hooks/useMessage";
import { FirestoreService } from "../../services";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingTop: 14,
    paddingHorizontal: 28,
    paddingBottom: 0.31 * width,
  },
  dateStyle: {
    color: colors.fontBlack,
    // width: '100%',
    textAlign: "center",
  },
});

type Props = {
  navigation: StackNavigationProp<AppStackParams, "Room">;
  route: RouteProp<AppStackParams, "Room">;
};

const myId = "12345";

let date: string[] = [];

const Room = ({ navigation, route }: Props) => {
  const [payload] = useState<RoomProps>(() => {
    const { id, recentMessage, members } = JSON.parse(route.params.payload);
    return { id, recentMessage, members };
  });
  const { id, recentMessage } = payload;
  // useMessage hooks
  const messages = useMessage(id);

  const FLRef = useRef<FlatList<MessageProps>>(null);

  // fetch user detail for header
  useEffect(() => {
    // TODO: fetch user detail and store it to user
  }, []);

  // update readBy param in firestore
  useEffect(() => {
    if (FLRef.current) {
      FLRef.current.scrollToEnd({ animated: true });
    }
    const readBy = recentMessage?.readBy;
    const isRead = readBy?.indexOf(myId);
    if ((isRead as number) < 0) {
      readBy?.push(myId);
      // IIFE for updating recent readBy
      (async () => {
        try {
          await FirestoreService.RoomCollection.doc(id).update({
            "recentMessage.readBy": readBy,
          });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  // send message function
  const sendMessage = async (messageText: string, isImage: boolean) => {
    try {
      const message: MessageProps = {
        messageText,
        isImage,
        sentBy: myId,
        sentAt: new Date().toISOString(),
      };
      const newRecentMessage = {
        ...recentMessage,
        messageText,
        sentAt: new Date().toISOString(),
        sentBy: myId,
      };
      await FirestoreService.MessageCollection.doc(id)
        .collection("messages")
        .add(message);
      await FirestoreService.RoomCollection.doc(id).update({
        recentMessage: newRecentMessage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (date.length) {
      date = [];
    }
  }, [messages]);

  // bubble onPress
  const onPressBubble = (messageId: string, messageText: string) => {
    navigation.navigate("ImageView", { id: messageId, messageText });
  };

  // render flatlist item
  const renderItems: ListRenderItem<MessageProps> = ({ item, index }) => {
    const isSameDate = date.indexOf(dayjs(item.sentAt).format("DDMMYYYY"));
    if (isSameDate < 0) {
      date.push(dayjs(item.sentAt as string).format("DDMMYYYY"));
    }
    return (
      <View key={index}>
        {isSameDate < 0 && (
          <Text variant="timestamp" marginBottom="s" style={styles.dateStyle}>
            {dayjs(item.sentAt as string).format("ddd, D MMMM YYYY")}
          </Text>
        )}
        {item.sentBy === myId ? (
          <MyBubble key={index} {...item} onPress={onPressBubble} />
        ) : (
          <Bubble key={index} {...item} onPress={onPressBubble} />
        )}
      </View>
    );
  };

  return (
    <Layout>
      <Header backOnPress={() => navigation.goBack()} />
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={messages}
        renderItem={renderItems}
        keyExtractor={(_, index) => String(index)}
        ref={FLRef}
        onContentSizeChange={() => {
          if (FLRef.current) {
            FLRef.current.scrollToEnd({
              animated: true,
            });
          }
        }}
      />
      <Input onSend={sendMessage} />
    </Layout>
  );
};

export default Room;
