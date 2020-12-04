import React, {useEffect} from 'react';
import {Dimensions, Image} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Text, TouchableOpacity, View} from '../common';
import AnimatedView from '../common/AnimatedView';
import Back from './Icons/Back';
import Call from './Icons/Call';
import Contact from './Icons/Contact';
import Faq from './Icons/Faq';
import Friend from './Icons/Friend';
import Saved from './Icons/Saved';
import Setting from './Icons/Setting';

const {width} = Dimensions.get('window');

const SIDEBAR_WIDTH = 0.82 * width;
const INITIAL_WIDTH = 0;

interface Props {
  isActive?: boolean;
  backOnPress?: () => void;
}

const SidebarMenu = [
  {
    label: 'Contacts',
    icon: <Contact />,
    onPress: () => {},
  },
  {
    label: 'Calls',
    icon: <Call />,
    onPress: () => {},
  },
  {
    label: 'Saved Messages',
    icon: <Saved />,
    onPress: () => {},
  },
  {
    label: 'Invite Friends',
    icon: <Friend />,
    onPress: () => {},
  },
  {
    label: 'FAQ',
    icon: <Faq />,
    onPress: () => {},
  },
];

const Sidebar = ({isActive, backOnPress}: Props) => {
  const sidebarWidth = useSharedValue<number>(INITIAL_WIDTH);
  useEffect(() => {
    if (isActive) {
      sidebarWidth.value = SIDEBAR_WIDTH;
    } else {
      sidebarWidth.value = INITIAL_WIDTH;
    }
  }, [isActive]);

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(sidebarWidth.value),
    };
  });

  return (
    <AnimatedView
      animatedStyle={[
        {
          top: 0,
          right: 0,
          position: 'absolute',
          zIndex: 2,
          overflow: 'hidden',
          flex: 1,
          height: '100%',
        },
        style,
      ]}
      flex={1}
      flexDirection="column"
      justifyContent="flex-start"
      height="100%"
      width={SIDEBAR_WIDTH}
      backgroundColor="white"
      borderTopLeftRadius="l"
      borderBottomLeftRadius="l"
      paddingVertical="m"
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray">
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <TouchableOpacity
          paddingLeft="l"
          paddingRight="l"
          alignSelf="center"
          onPress={backOnPress}>
          <Back />
        </TouchableOpacity>
        <TouchableOpacity alignSelf="center" paddingRight="l">
          <Setting />
        </TouchableOpacity>
      </View>
      <View
        paddingHorizontal="l"
        marginTop="l"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center">
        <Image
          style={{
            width: width * 0.18,
            height: width * 0.18,
            borderRadius: (width * 0.14) / 4,
            alignSelf: 'center',
          }}
          source={require('../../assets/example.jpg')}
        />
        <Text
          variant="headerProfile"
          numberOfLines={2}
          paddingLeft="s"
          style={{maxWidth: 0.46 * width}}>
          Taufiq Widi Nugroho
        </Text>
      </View>
      {SidebarMenu.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            paddingHorizontal="l"
            marginTop="l">
            <View
              flex={1}
              flexDirection="row"
              justifyContent="center"
              alignItems="center">
              {item.icon}
            </View>
            <View flex={5} marginLeft="s">
              <Text variant="sidebarMenu">{item.label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </AnimatedView>
  );
};

export default Sidebar;
