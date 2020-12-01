import React from 'react';
import {View, Text} from '../../components/common';
import Layout from '../../layout';
import Header from '../../components/MainHeader';
import ScrollBar from '../../components/ScrollBar';

interface Props {}

const Main = (props: Props) => {
  return (
    <Layout>
      <Header />
      <ScrollBar />
    </Layout>
  );
};

export default Main;
