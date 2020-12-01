import React from 'react';
import {Text, View} from '../common';
import {BorderlessButton} from 'react-native-gesture-handler';
import Plus from './Icons/Plus';
import Search from './Icons/Search';
import More from './Icons/More';

interface Props {}

const MainHeader = (props: Props) => {
  return (
    <View
      backgroundColor="white"
      flexDirection="row"
      justifyContent="space-between">
      <Text variant="header" paddingVertical="s" paddingLeft="l">
        Cengkerama
      </Text>
      <View
        flex={1}
        flexDirection="row"
        justifyContent="flex-end"
        backgroundColor="white"
        paddingRight="l"
        >
        <BorderlessButton style={{alignSelf: 'center', overflow:'visible'}}>
          <Plus />
        </BorderlessButton>
        <BorderlessButton style={{alignSelf: 'center', marginLeft: 14}}>
          <Search />
        </BorderlessButton>
        <BorderlessButton style={{alignSelf: 'center', marginLeft: 14}}>
          <More />
        </BorderlessButton>
      </View>
    </View>
  );
};

export default MainHeader;
