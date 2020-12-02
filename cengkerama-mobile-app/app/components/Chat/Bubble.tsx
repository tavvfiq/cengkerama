import React from 'react';
import {Dimensions, Image} from 'react-native';
import {colors} from '../../constant';
import {Text, View} from '../common';
import moment from 'moment';

const {width} = Dimensions.get('window');

interface Props {
  message?: string;
  picture?: string;
  date?: string;
}

export const Bubble = ({message, picture, date}: Props) => {
  return (
    <View width="100%" flex={1}>
      <View
        borderTopLeftRadius="l"
        borderTopRightRadius="l"
        borderBottomRightRadius="l"
        borderBottomLeftRadius="s"
        padding="s"
        overflow="hidden"
        maxWidth={0.79 * width}
        backgroundColor="chatBgSecondary">
        {picture ? (
          <Image
            source={{uri: picture}}
            style={{width: '100%', height: '100%'}}
          />
        ) : (
          <Text variant="otherChat">{message}</Text>
        )}
      </View>
      <Text variant="timestampChatroom" style={{width: '100%'}}>
        {moment(date).format('ddd, hh:mm')}
      </Text>
    </View>
  );
};
export const MyBubble = ({message, picture, date}: Props) => {
  return (
    <View width="100%" flex={1}>
      <View
        borderTopLeftRadius="l"
        borderTopRightRadius="l"
        borderBottomRightRadius="s"
        borderBottomLeftRadius="l"
        padding="s"
        alignSelf="flex-end"
        overflow="hidden"
        maxWidth={0.79 * width}
        backgroundColor="chatBgMain">
        {picture ? (
          <Image
            source={{uri: picture}}
            style={{width: '100%', height: '100%'}}
          />
        ) : (
          <Text variant="myChat">{message}</Text>
        )}
      </View>
      <Text
        variant="timestampChatroom"
        style={{color: colors.fontBlack, width: '100%', textAlign: 'right'}}>
        {moment(date).format('ddd, hh:mm')}
      </Text>
    </View>
  );
};
