import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, ListRenderItem} from 'react-native';
import {Bubble, Header, MyBubble, Input} from '../../components/Chat';
import {MessageProps, RoomProps, UserProps} from '../../interface';
import Layout from '../../layout';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Text, View} from '../../components/common';
import moment from 'moment';
import {colors} from '../../constant';

const {width} = Dimensions.get('window');

const myId = '12345';
const roomId = 'elvROwWbVq6I0IbtYc1L';

const Room = ({id, members, type, recentMessage, ...rest}: RoomProps) => {
  const [messages, retrieveMessage] = useState<MessageProps[]>([]);
  const [user, setUser] = useState<UserProps>();
  const [messageDB] = useState<FirebaseFirestoreTypes.CollectionReference>(
    firestore().collection('message'),
  );
  const [roomDB] = useState<FirebaseFirestoreTypes.CollectionReference>(
    firestore().collection('room'),
  );
  let FLRef = useRef<FlatList<MessageProps>>(null);

  // fetch user detail for header
  useEffect(() => {
    // TODO: fetch user detail and store it to user
  }, []);

  // subscribe to message collection snapshot
  useEffect(() => {
    // TODO: fetch messages based on roomId from firestore and store them to messages
    const readBy: string[] = [];
    const isRead = readBy.indexOf(myId);
    if (isRead < 0) {
      readBy.push(myId);
      // IIFE for updating recent readBy
      (async () => {
        try {
          await roomDB.doc(roomId).update({
            'recentMessage.readBy': readBy,
          });
        } catch (error) {
          console.log(error);
        }
      })();
    }
    const subscriber = messageDB
      .doc(roomId)
      .collection('messages')
      .orderBy('sentAt', 'asc')
      .onSnapshot(
        (result) => {
          if (result) {
            const messages = result.docs.map((doc) => {
              return doc.data();
            });
            retrieveMessage(() => messages);
          }
        },
        (error) => console.log(error),
      );
    // Unsubscribe from events when no longer in use
    return () => subscriber();
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
      await messageDB.doc(roomId).collection('messages').add(message);
      await roomDB.doc(roomId).update({
        recentMessage: newRecentMessage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  let date: Array<string> = [];

  useEffect(() => {
    if (date.length) date = [];
  }, [messages]);

  // render flatlist item
  const renderItems: ListRenderItem<MessageProps> = ({item, index}) => {
    const isSameDate = date.indexOf(moment(item.sentAt).format('LL'));
    if (isSameDate < 0) date.push(moment(item.sentAt as string).format('LL'));
    return (
      <View key={index}>
        {isSameDate < 0 && (
          <Text
            variant="timestamp"
            marginBottom="s"
            style={{
              color: colors.fontBlack,
              width: '100%',
              textAlign: 'center',
            }}>
            {moment(item.sentAt as string).format('DD MMMM YYYY')}
          </Text>
        )}
        {item.sentBy === myId ? (
          <MyBubble key={index} {...item} />
        ) : (
          <Bubble key={index} {...item} />
        )}
      </View>
    );
  };

  return (
    <Layout>
      <Header />
      <FlatList
        contentContainerStyle={{
          paddingTop: 14,
          paddingHorizontal: 28,
          paddingBottom: 0.31 * width,
        }}
        data={messages}
        renderItem={renderItems}
        keyExtractor={(_, index) => String(index)}
        ref={FLRef}
        onContentSizeChange={() => {
          if (FLRef.current)
            FLRef.current.scrollToEnd({
              animated: true,
            });
        }}
      />
      <Input onSend={sendMessage} />
    </Layout>
  );
};

export default Room;
