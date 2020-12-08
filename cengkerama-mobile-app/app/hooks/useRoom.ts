import { useState, useEffect } from "react";

import { RoomProps } from "../interface";
import { FirestoreService } from "../services";

const useRoom = (userId: string) => {
  const [rooms, setRoom] = useState<RoomProps[]>([]);

  useEffect(() => {
    const subscriber = FirestoreService.RoomCollection.where(
      "members",
      "array-contains",
      userId,
    )
      .orderBy("recentMessage.sentAt", "desc")
      .onSnapshot(
        (result) => {
          if (result) {
            const retrievedRooms = result.docs.map((doc) => {
              const data = doc.data();
              return {
                ...data,
                id: doc.id,
                createdAt: data.createdAt,
                members: data.members,
                modifiedAt: data.modifiedAt,
                type: data.type,
              };
            });
            setRoom(() => retrievedRooms);
          }
        },
        (error) => console.log(error),
      );
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [userId]);
  return rooms;
};

export default useRoom;
