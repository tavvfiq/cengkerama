import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {colors} from '../../constant';
import {Text, View} from '../common';
import dayjs from 'dayjs';
import {MessageProps} from '../../interface';

const {width} = Dimensions.get('window');

type Props = MessageProps;

export const Bubble = ({messageText, isImage, sentAt}: Props) => {
  return (
    <View width="100%" flex={1}>
      <View
        borderTopLeftRadius="l"
        borderTopRightRadius="l"
        borderBottomRightRadius="l"
        borderBottomLeftRadius="s"
        padding="s"
        alignSelf="flex-start"
        overflow="hidden"
        maxWidth={0.79 * width}
        backgroundColor="chatBgSecondary">
        {isImage ? (
          <Image source={{uri: messageText}} style={styles.avatar} />
        ) : (
          <Text variant="otherChat">{messageText}</Text>
        )}
      </View>
      <Text variant="timestampChatroom" style={styles.bubble}>
        {dayjs(sentAt).format('hh:mm a')}
      </Text>
    </View>
  );
};
export const MyBubble = ({messageText, isImage, sentAt}: Props) => {
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
        {isImage ? (
          <Image source={{uri: messageText}} style={styles.avatar} />
        ) : (
          <Text variant="myChat">{messageText}</Text>
        )}
      </View>
      <Text variant="timestampChatroom" style={styles.mybubble}>
        {dayjs(sentAt).format('hh:mm a')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: '100%',
  },
  mybubble: {
    color: colors.fontBlack,
    width: '100%',
    textAlign: 'right',
  },
  bubble: {width: '100%'},
});
