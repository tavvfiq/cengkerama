import React from 'react';
import {Text, View} from '../common';
import {BorderlessButton} from 'react-native-gesture-handler';
import Plus from './Icons/Plus';
import Search from './Icons/Search';
import More from './Icons/More';

interface Props {
  moreOnPress: () => void;
  addOnPress?: () => void;
  searchOnPress?: () => void;
}

const MainHeader = ({moreOnPress, addOnPress, searchOnPress}: Props) => {
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
        paddingRight="l">
        <BorderlessButton
          style={{alignSelf: 'center', overflow: 'visible'}}
          onPress={addOnPress}>
          <Plus />
        </BorderlessButton>
        <BorderlessButton
          style={{alignSelf: 'center', marginLeft: 14}}
          onPress={searchOnPress}>
          <Search />
        </BorderlessButton>
        <BorderlessButton
          style={{alignSelf: 'center', marginLeft: 14}}
          onPress={moreOnPress}>
          <More />
        </BorderlessButton>
      </View>
    </View>
  );
};

export default MainHeader;
