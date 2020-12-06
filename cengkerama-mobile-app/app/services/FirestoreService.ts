import firestore from '@react-native-firebase/firestore';

export const MessageCollection = firestore().collection('message');

export const RoomCollection = firestore().collection('room');
