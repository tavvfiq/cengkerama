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
    type: string;
  };
  type?: string;
};

export type MessageProps = {
  id?: string;
  messageText?: string;
  isImage?: boolean;
  sentAt?: string;
  sentBy?: string;
  type?: string;
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
  Room: { payload: string };
  ImageView: { id: string; data?: string };
};

export type ImageType = {
  uri: string;
  fileSize?: number | null;
  type?: string | null;
  filename: string | null;
  width?: number | null;
  height?: number | null;
};

export type ScrollbarItems = {
  label: string;
  onPress?: () => void;
};
