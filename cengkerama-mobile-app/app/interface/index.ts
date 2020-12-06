export type RoomProps = {
  id: string;
  createdAt?: string;
  createdBy?: string;
  members: Array<string>;
  modifiedAt?: string;
  name?: string;
  recentMessage?: {
    messageText: string;
    readBy: Array<string>;
    sentAt: string;
    sentBy: string;
  };
  type?: string;
};

export type MessageProps = {
  id?: string;
  messageText?: string;
  isImage?: boolean;
  sentAt?: string;
  sentBy?: string;
};

export type UserProps = {
  id: string;
  name: string;
  phoneNumber: string;
  photoURL: string;
  rooms: Array<string>;
  contacts: Array<string>;
};

export type AppStackParams = {
  Main: undefined;
  Room: {payload: string};
  ImageView: {id: string; messageText?: string};
};
