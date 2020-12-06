import React, {ReactElement, useCallback} from 'react';
import {
  Image,
  Dimensions,
  I18nManager,
  Animated,
  StyleSheet,
} from 'react-native';
import {Text, View, Button} from '../common';
import Trash from './Icons/Trash';
import Bookmark from './Icons/Bookmark';
import Checkmark from './Icons/Checkmark';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RoomProps} from '../../interface';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const defaultImage = require('../../assets/default.png');

const {width} = Dimensions.get('window');

const SWIPEABLE_WIDTH = 0.61 * width;

const swipeButtons = [
  {
    icon: <Bookmark />,
    x: SWIPEABLE_WIDTH,
  },
  {
    icon: <Checkmark />,
    x: 0.67 * SWIPEABLE_WIDTH,
  },
  {
    icon: <Trash />,
    x: 0.33 * SWIPEABLE_WIDTH,
  },
];

type CardProps = RoomProps & {
  onPress?: (payload: string) => void;
};

const renderRightAction = (icon: ReactElement, x: number) => {
  const pressHandler = () => {
    // this.close();
    // alert(text);
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Animated.View key={x} style={{flex: 1, transform: [{translateX: 0}]}}>
      <Button
        backgroundColor="bluePrimary"
        onPress={pressHandler}
        height="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        {icon}
      </Button>
    </Animated.View>
  );
};

const renderRightActions = () => {
  return (
    <View
      width={SWIPEABLE_WIDTH}
      backgroundColor="bluePrimary"
      flexDirection={I18nManager.isRTL ? 'row-reverse' : 'row'}>
      {swipeButtons.map((button) => {
        return renderRightAction(button.icon, button.x);
      })}
    </View>
  );
};

const checkTime = (time: string): string => {
  const _default = dayjs(time).format('DD/MM/YYYY');
  const _year = dayjs(time).year();
  const _month = dayjs(time).month();
  const _day = dayjs(time).day();

  if (dayjs().subtract(_year, 'year').year() === 0) {
    if (dayjs().subtract(_month, 'month').month() === 0) {
      if (dayjs().subtract(_day, 'day').day() <= 1) {
        return dayjs(time).fromNow();
      }
    }
  }
  return _default;
};

const Card = ({id, recentMessage, members, type, onPress}: CardProps) => {
  const handleOnPress = useCallback(() => {
    const payload = JSON.stringify({id, recentMessage, members});
    if (onPress) {
      onPress(payload);
    }
  }, [id]);
  return (
    <Swipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      <Button
        backgroundColor="white"
        width={width}
        paddingHorizontal="l"
        height={width * 0.198}
        onPress={handleOnPress}
        flexDirection="row"
        justifyContent="space-between">
        <Image style={styles.imageStyle} source={defaultImage} />
        <View
          flex={1}
          marginLeft="s"
          flexDirection="column"
          justifyContent="center">
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Text variant="contactName" numberOfLines={1} ellipsizeMode="tail">
              Taufiq Widi
            </Text>
            <Text variant="timestamp">
              {checkTime(recentMessage?.sentAt as string)}
            </Text>
          </View>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Text
              variant={
                recentMessage?.readBy.length !== 0
                  ? 'lastChat'
                  : 'lastChatUnread'
              }
              numberOfLines={1}
              ellipsizeMode="tail">
              {recentMessage?.messageText}
            </Text>
          </View>
        </View>
      </Button>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: (width * 0.14) / 4,
    alignSelf: 'center',
  },
});

export default Card;
