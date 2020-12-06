import {useState, useEffect} from 'react';
import {MessageProps} from '../interface';
import {FirestoreService} from '../services';

const useMessage = (roomId: string) => {
  const [message, setMessage] = useState<MessageProps[]>([]);

  useEffect(() => {
    const subscriber = FirestoreService.MessageCollection.doc(roomId)
      .collection('messages')
      .orderBy('sentAt', 'asc')
      .onSnapshot(
        (result) => {
          if (result) {
            const messages = result.docs.map((doc) => {
              return doc.data();
            });
            setMessage(() => messages);
          }
        },
        (error) => console.log(error),
      );
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [roomId]);
  return message;
};

export default useMessage;
