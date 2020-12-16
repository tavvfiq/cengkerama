import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, useState, useRef } from "react";

import { ImageType, MessageProps, RoomProps } from "../interface";
import { FirestoreService } from "../services";
import { CompressConfig, CompressImages } from "../utils/imageCompressor";
import { generateUUID } from "../utils/uuidGenerator";

import useAsyncStorage from "./useAsyncStorage";

const defaultCompression: CompressConfig = {
  widthRatio: 0.8,
  heightRatio: 0.8,
  quality: 85,
};

/**
useMessage Hooks
@param roomId yeah, room Id to subscribe to the message with defined room id
@param userId to fill the sentBy and readBy
@param imageConfig Compression for image type message, leave it to used the default value
*/

const useMessage = (
  roomId: string,
  userId: string,
  imageConfig?: CompressConfig,
): [
  MessageProps[] | null,
  (type: string, messageText?: string, payload?: string) => Promise<void>,
] => {
  // return data
  const [message, setMessage, writeToStorage] = useAsyncStorage<MessageProps[]>(
    roomId + userId,
    [],
  );

  // containe for image type message
  const imageContainer = useRef<string[]>([]);

  const [snapshot, setSnapshot] = useState<
    FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
  >();

  const updateMessageFromSnapshot = () => {
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
        if (__DEV__) {
          console.log("APPEND_FROM_SNAPSHOT");
        }
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
            newMessage.unshift({ id: item.doc.id, ...item.doc.data() });
          }
        });
        setMessage(newMessage);
      }
    }
  };

  useEffect(() => {
    const subscriber = FirestoreService.MessageCollection(roomId)
      .orderBy("sentAt", "desc")
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
      (async () => {
        writeToStorage();
      })();
      subscriber();
    };
  }, [roomId, userId]);

  useEffect(() => {
    updateMessageFromSnapshot();
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
        messageText: message[0].messageText,
        sentAt: message[0].sentAt,
        sentBy: userId,
        readBy: [userId],
        type: message[0].type,
      };
      FirestoreService.RoomCollection.doc(roomId).update({
        recentMessage: newRecentMessage,
      });
    }
  }, [message.length]);

  // upload image handler
  const uploadImage = async (images: ImageType[]) => {
    try {
      // compression config
      const config: CompressConfig = imageConfig
        ? imageConfig
        : defaultCompression;
      // container for compressed images
      const compressedImage: { [key: string]: string }[] = [];
      // compress images
      await CompressImages(images, config, compressedImage);
      // upload config to firebase
      const uploadConfig = compressedImage.map((image) => {
        return {
          storagePath: `${roomId}/${image.filename}`,
          filePath: image.uri,
        };
      });
      //containr for image links
      const imageLinks: { [key: string]: string }[] = [];
      await FirestoreService.Storage.uploadFilesAndGetLink(
        uploadConfig,
        imageLinks,
      );
      imageContainer.current.push(
        ...imageLinks.map((image) => {
          return image.url;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const _send = async (
    messageId: string,
    messageText: string,
    type: string,
  ) => {
    try {
      if (__DEV__) {
        console.log("SEND: ", type);
      }
      const _message: MessageProps = {
        id: messageId,
        messageText: messageText,
        sentBy: userId,
        sentAt: new Date().toISOString(),
        type,
      };
      await FirestoreService.MessageCollection(roomId)
        .doc(messageId)
        .set(_message);
    } catch (error) {
      console.error(error);
    }
  };

  // send message function
  const sendMessage = async (
    type: string,
    messageText?: string,
    payload?: string,
  ) => {
    try {
      if (type === "text") {
        const messageId = generateUUID();
        const newMessages = [...(message as MessageProps[])];
        /** push placeholder message to the beginning of message array,
          so user can see the message while sending */
        newMessages.unshift({
          id: messageId,
          messageText: messageText,
          sentBy: userId,
          sentAt: undefined,
          type,
        });
        setMessage(newMessages);
        await _send(messageId, messageText as string, type);
      } else if (type === "image") {
        const images: ImageType[] = JSON.parse(payload as string);
        const newMessages = [...(message as MessageProps[])];
        const Ids: string[] = [];
        images.map((image) => {
          const messageId = generateUUID();
          Ids.push(messageId);
          /** push placeholder message to the beginning of message array,
          so user can see the message while sending */
          newMessages.unshift({
            id: messageId,
            messageText: image.uri,
            sentBy: userId,
            sentAt: undefined,
            type,
          });
        });
        setMessage(newMessages);
        await uploadImage(images);
        for (let idx = 0; idx < imageContainer.current.length; idx++) {
          await _send(Ids[idx], imageContainer.current[idx], type);
        }
        imageContainer.current = [];
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [message, sendMessage];
};

export default useMessage;
