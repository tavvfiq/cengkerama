import React, {useCallback, useEffect, useState} from 'react';
import Layout from '../../layout';
import Header from '../../components/MainHeader';
import Scrollbar from '../../components/Scrollbar';
import Sidebar from '../../components/Sidebar';
import firestore from '@react-native-firebase/firestore';
import {FlatList, ListRenderItem} from 'react-native';
import {RoomProps} from '../../interface';
import Card from '../../components/Chat/Card';

interface Props {}

const myId = '12345';

const Main = (props: Props) => {
  const [isActive, setSidebar] = useState<boolean>(false);
  const [rooms, retrieveRooms] = useState<RoomProps[]>([]);

  // retrieve rooms from firestore
  useEffect(() => {
    let roomRef = firestore()
      .collection('room')
      .where('members', 'array-contains', myId)
      .orderBy('recentMessage.sentAt', 'desc');
    const subscriber = roomRef.onSnapshot((result) => {
      if (result) {
        const retrievedRooms: RoomProps[] = result.docs.map((doc) => {
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
        retrieveRooms(() => retrievedRooms);
      }
    });
    return () => subscriber();
  }, []);

  // sidebar icon handler
  const moreOnPress = useCallback(() => {
    setSidebar((prevValue) => !prevValue);
  }, [setSidebar]);

  // render rooms on flatlist
  const renderRooms: ListRenderItem<RoomProps> = ({item, index}) => {
    return <Card key={item.id} {...item} />;
  };

  return (
    <Layout>
      <Header moreOnPress={moreOnPress} />
      <Scrollbar />
      <Sidebar isActive={isActive} backOnPress={moreOnPress} />
      <FlatList
        contentContainerStyle={{paddingBottom: 14}}
        data={rooms}
        renderItem={renderRooms}
      />
    </Layout>
  );
};

export default Main;
