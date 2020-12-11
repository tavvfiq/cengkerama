import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, ListRenderItem, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
// import ImageResizer from "react-native-image-resizer";

import { Bubble, Header, MyBubble, Input } from "../../components/Chat";
import {
  AppStackParams,
  ImageType,
  MessageProps,
  RoomProps,
} from "../../interface";
import Layout from "../../layout";
import { Text, View } from "../../components/common";
import { colors } from "../../constant";
import useMessage from "../../hooks/useMessage";
import { FirestoreService } from "../../services";
import { CompressConfig, CompressImages } from "../../utils/imageCompressor";
import { generateUUID } from "../../utils/uuidGenerator";

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

const Room = ({ navigation, route }: Props) => {
  const [payload] = useState<RoomProps>(() => {
    const { id, recentMessage, members } = JSON.parse(route.params.payload);
    return { id, recentMessage, members };
  });
  const { id } = payload;
  const [loading, setLoading] = useState(false);

  // useMessage hooks
  const [messages, setMessage] = useMessage(id, myId);

  const FLRef = useRef<FlatList<MessageProps>>(null);
  const imagesRef = useRef<string[]>([]);
  const date = useRef<Array<string>>([]);

  const scrollToEnd = useCallback(() => {
    if (FLRef.current) {
      FLRef.current.scrollToEnd({ animated: true });
    }
  }, [FLRef.current]);

  // scroll to end on messages change
  // useEffect(() => {
  //   scrollToEnd();
  // }, [messages?.length]);

  const uploadImage = async (images: ImageType[]) => {
    try {
      // compression config
      const config: CompressConfig = {
        widthRatio: 0.8,
        heightRatio: 0.8,
        quality: 85,
      };
      // container for compressed images
      const compressedImage: { [key: string]: string }[] = [];
      // compress images
      await CompressImages(images, config, compressedImage);
      // upload config to firebase
      const uploadConfig = compressedImage.map((image) => {
        return {
          storagePath: `${id}/${image.filename}`,
          filePath: image.uri,
        };
      });
      //containr for image links
      const imageLinks: { [key: string]: string }[] = [];
      await FirestoreService.Storage.uploadFilesAndGetLink(
        uploadConfig,
        imageLinks,
      );
      imagesRef.current.push(
        ...imageLinks.map((image) => {
          return image.url;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const send = async (messageId: string, messageText: string, type: string) => {
    try {
      console.log("SEND: ", type);
      const message: MessageProps = {
        id: messageId,
        messageText: messageText,
        sentBy: myId,
        sentAt: new Date().toISOString(),
        type,
      };
      await FirestoreService.MessageCollection(id).doc(messageId).set(message);
    } catch (error) {
      console.error(error);
    }
  };

  // send message function
  const sendMessage = async (
    type: string,
    messageText?: string,
    imagePayload?: string,
  ) => {
    try {
      setLoading(true);
      if (type === "text") {
        const messageId = generateUUID();
        const newMessages = [...(messages as MessageProps[])];
        newMessages.push({
          id: messageId,
          messageText: messageText,
          sentBy: myId,
          sentAt: undefined,
          type,
        });
        setMessage(newMessages);
        await send(messageId, messageText as string, type);
      } else if (type === "image") {
        const images: ImageType[] = JSON.parse(imagePayload as string);
        const newMessages = [...(messages as MessageProps[])];
        const Ids: string[] = [];
        images.map((image) => {
          const messageId = generateUUID();
          Ids.push(messageId);
          newMessages.push({
            id: messageId,
            messageText: image.uri,
            sentBy: myId,
            sentAt: undefined,
            type,
          });
        });
        setMessage(newMessages);
        await uploadImage(images);
        for (let idx = 0; idx < imagesRef.current.length; idx++) {
          await send(Ids[idx], imagesRef.current[idx], type);
        }
        imagesRef.current = [];
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSend = (
    type: string,
    messageText?: string,
    imagePayload?: string,
  ) => {
    sendMessage(type, messageText, imagePayload);
  };

  useEffect(() => {
    if (date.current.length) {
      date.current = [];
    }
  }, [messages]);

  // render flatlist item
  const renderItems: ListRenderItem<MessageProps> = ({ item, index }) => {
    const isSameDate = date.current.indexOf(
      dayjs(item.sentAt).format("DDMMYYYY"),
    );

    if (isSameDate < 0) {
      date.current.push(dayjs(item.sentAt as string).format("DDMMYYYY"));
    }
    return (
      <View key={index}>
        {isSameDate < 0 && (
          <Text variant="timestamp" marginBottom="s" style={styles.dateStyle}>
            {dayjs(item.sentAt as string).format("ddd, D MMMM YYYY")}
          </Text>
        )}
        {item.sentBy === myId ? (
          <MyBubble key={item.id} {...item} />
        ) : (
          <Bubble key={item.id} {...item} />
        )}
      </View>
    );
  };

  return (
    <Layout>
      <Header backOnPress={() => navigation.goBack()} />
      {/* {messages?.length !== 0 && ( */}
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={messages}
        renderItem={renderItems}
        keyExtractor={(item, index) => {
          if (item) {
            return item.id as string;
          } else {
            return String(index);
          }
        }}
        ref={FLRef}
        getItemLayout={(data, index) => ({
          length: 0.5 * width,
          offset: 0.5 * width * index,
          index,
        })}
        onContentSizeChange={scrollToEnd}
      />
      {/* )} */}
      <Input onSend={handleSend} />
    </Layout>
  );
};

export default Room;
