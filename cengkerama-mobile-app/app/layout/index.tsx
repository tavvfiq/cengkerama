import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from '../components/common';

const Layout: React.FunctionComponent = (props) => {
  return (
    <View backgroundColor="white" flex={1}>
      {props.children}
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({});
