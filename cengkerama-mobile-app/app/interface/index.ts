export type RecentMessage = {
  messageText: string;
  readBy: Array<string>;
  sentAt: string;
  sentBy: string;
  type: string;
};

export type RoomProps = {
  id: string;
  createdAt?: string;
  createdBy?: string;
  members: Array<string>;
  modifiedAt?: string;
  name?: string;
  recentMessage?: RecentMessage;
  type?: string;
};

export type MessageProps = {
  id?: string;
  messageText?: string;
  sentAt?: string;
  sentBy?: string;
  type?: string;
};

export type User = {
  id?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  profilePicture?: string;
  contacts?: Array<string>;
  rooms?: Array<string>;
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

export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};

export type ImageType = {
  uri: string;
  fileSize?: number;
  type?: string;
  filename: string;
  width: number;
  height: number;
};

export type ScrollbarItems = {
  label: string;
  onPress?: () => void;
};
