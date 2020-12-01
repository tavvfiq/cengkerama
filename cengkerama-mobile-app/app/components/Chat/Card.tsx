import React, {ReactElement} from 'react';
import {Image, Dimensions, I18nManager, Animated, Alert} from 'react-native';
import {Text, View, Button, BorderlessButton} from '../common';
import Trash from './Icons/Trash';
import Bookmark from './Icons/Bookmark';
import Checkmark from './Icons/Checkmark';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const {width} = Dimensions.get('window');

type RightActionProps = {};

interface Props {
  isRead?: boolean;
}

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

const Card = ({isRead}: Props) => {
  const renderRightAction = (
    icon: ReactElement,
    x: number,
    progress: Animated.AnimatedInterpolation,
  ) => {
    const pressHandler = () => {
      // this.close();
      // alert(text);
    };
    return (
      <Animated.View key={x} style={{flex: 1, transform: [{translateX: 0}]}}>
        <Button
          backgroundColor="none"
          onPress={pressHandler}
          // flex={1}
          height="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center">
          {icon}
        </Button>
      </Animated.View>
    );
  };
  const renderRightActions = (progress: Animated.AnimatedInterpolation) => {
    return (
      <View
        width={SWIPEABLE_WIDTH}
        backgroundColor="bluePrimary"
        flexDirection={I18nManager.isRTL ? 'row-reverse' : 'row'}>
        {swipeButtons.map((button, index) => {
          return renderRightAction(button.icon, button.x, progress);
        })}
      </View>
    );
  };
  return (
    <Swipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      <Button
        backgroundColor="chatListCardBg"
        width={width}
        paddingHorizontal="l"
        height={width * 0.198}
        onPress={() => {}}
        flexDirection="row"
        justifyContent="space-between">
        <Image
          style={{
            width: width * 0.18,
            height: width * 0.18,
            borderRadius: 20,
            alignSelf: 'center',
          }}
          source={require('../../assets/example.jpg')}
        />
        <View
          flex={1}
          marginLeft="s"
          flexDirection="column"
          justifyContent="center">
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Text variant="contactName">Taufiq Widi</Text>
            <Text variant="timestamp">15.20</Text>
          </View>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Text variant={isRead ? 'lastChat' : 'lastChatUnread'}>
              Halo...
            </Text>
          </View>
        </View>
      </Button>
     </Swipeable>
  );
};

export default Card;
