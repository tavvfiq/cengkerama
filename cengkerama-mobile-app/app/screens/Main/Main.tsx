import React from 'react';
import {ChatCard} from '../../components/Chat';
import Layout from '../../layout';
import Header from '../../components/MainHeader';
import ScrollBar from '../../components/ScrollBar';

interface Props {}

const Main = (props: Props) => {
  return (
    <Layout>
      <Header />
      <ScrollBar />
      <ChatCard />
    </Layout>
  );
};

export default Main;
