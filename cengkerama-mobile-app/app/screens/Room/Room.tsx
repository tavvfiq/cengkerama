import React from 'react';
import {Dimensions, FlatList, ListRenderItem} from 'react-native';
import {Bubble, Header, MyBubble, Input} from '../../components/Chat';
import Layout from '../../layout';

const {width} = Dimensions.get('window');

interface Props {}

const myId = '12345';

const renderItems: ListRenderItem<DataType> = ({item, index}) => {
  if (item.id === myId) return <MyBubble key={index} {...item} />;
  return <Bubble key={index} {...item} />;
};

const Room = (props: Props) => {
  return (
    <Layout>
      <Header />
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 28,
          paddingBottom: 0.31 * width,
        }}
        data={data}
        renderItem={renderItems}
        keyExtractor={(_, index) => String(index)}
      />
      <Input />
    </Layout>
  );
};

type DataType = {
  id: string;
  message: string;
  picture?: string;
  date: string;
};

const data: DataType[] = [
  {
    id: '123456',
    message:
      'Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.',
    date: new Date().toISOString(),
  },
  {
    id: '12345',
    message:
      'Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.',
    date: new Date().toISOString(),
  },
  {
    id: '123456',
    message:
      'Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.',
    date: new Date().toISOString(),
  },
  {
    id: '12346',
    message:
      'Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.',
    date: new Date().toISOString(),
  },
  {
    id: '12346',
    message:
      'Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.',
    date: new Date().toISOString(),
  },
];

export default Room;
