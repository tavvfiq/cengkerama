import React, {useCallback, useState} from 'react';
import {ChatCard} from '../../components/Chat';
import Layout from '../../layout';
import Header from '../../components/MainHeader';
import Scrollbar from '../../components/Scrollbar';
import Sidebar from '../../components/Sidebar';

interface Props {}

const Main = (props: Props) => {
  const [isActive, setSidebar] = useState<boolean>(false);
  const moreOnPress = useCallback(() => {
    setSidebar((prevValue) => !prevValue);
  }, []);

  return (
    <Layout>
      <Header moreOnPress={moreOnPress} />
      <Scrollbar />
      <Sidebar isActive={isActive} backOnPress={moreOnPress} />
      <ChatCard />
    </Layout>
  );
};

export default Main;
