import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, Dispatch, SetStateAction, useState } from "react";

import { MessageProps, RoomProps } from "../interface";
import { FirestoreService } from "../services";

import useAsyncStorage from "./useAsyncStorage";

const useMessage = (
  roomId: string,
  userId: string,
): [MessageProps[] | null, Dispatch<SetStateAction<MessageProps[]>>] => {
  const [message, setMessage, writeToStorage] = useAsyncStorage<MessageProps[]>(
    roomId + userId,
    [],
  );

  const [snapshot, setSnapshot] = useState<
    FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
  >();

  const truncateMessage = () => {
    if (snapshot?.docChanges()) {
      const snapshotLength = snapshot.docChanges().length;
      const messageLength = message.length;
      if (
        snapshotLength > 0 &&
        (snapshotLength > messageLength || messageLength === 0)
      ) {
        const newMessage: MessageProps[] = snapshot?.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setMessage(newMessage);
      } else if (snapshotLength > 0 && snapshotLength < messageLength) {
        console.log("APPEND_FROM_SNAPSHOT");
        const newMessage: MessageProps[] = [...message];
        snapshot.docChanges().map((item) => {
          const idx = message.findIndex((m) => {
            return item.doc.id === m.id;
          });
          if (idx >= 0) {
            newMessage.splice(idx, 1, {
              id: item.doc.id,
              ...item.doc.data(),
            });
          } else {
            newMessage.push({ id: item.doc.id, ...item.doc.data() });
          }
        });
        setMessage(newMessage);
      }
    }
  };

  useEffect(() => {
    const subscriber = FirestoreService.MessageCollection(roomId)
      .orderBy("sentAt", "asc")
      .onSnapshot(
        (result) => {
          if (result) {
            setSnapshot(result);
          }
        },
        (error) => console.error(error),
      );
    // Unsubscribe from events when no longer in use
    return () => {
      writeToStorage();
      subscriber();
    };
  }, [roomId, userId]);

  useEffect(() => {
    truncateMessage();
  }, [snapshot]);

  // mark as read by current user
  useEffect(() => {
    FirestoreService.RoomCollection.doc(roomId)
      .get()
      .then((snapshotQuery) => {
        const { recentMessage } = snapshotQuery.data() as RoomProps;
        const readBy = recentMessage?.readBy;
        const isRead = readBy?.indexOf(userId);
        if ((isRead as number) < 0) {
          readBy?.push(userId);
          // IIFE for updating recent readBy
          (async () => {
            try {
              await FirestoreService.RoomCollection.doc(roomId).update({
                "recentMessage.readBy": readBy,
              });
            } catch (error) {
              console.error(error);
            }
          })();
        }
      });
  }, []);

  // update the recent message
  useEffect(() => {
    if (message.length > 0) {
      const newRecentMessage = {
        messageText: message[message?.length - 1].messageText,
        sentAt: message[message?.length - 1].sentAt,
        sentBy: userId,
        readBy: [userId],
        type: message[message?.length - 1].type,
      };
      FirestoreService.RoomCollection.doc(roomId).update({
        recentMessage: newRecentMessage,
      });
    }
  }, [message.length]);

  return [message, setMessage];
};

export default useMessage;
