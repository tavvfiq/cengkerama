import React from 'react';
import {Dimensions, TextInput} from 'react-native';
import {Text, TouchableOpacity, View} from '../common';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '../../constant';

const {width} = Dimensions.get('window');

interface Props {}

const Input = (props: Props) => {
  return (
    <View
      backgroundColor="white"
      padding="m"
      width={width}
      position="absolute"
      bottom={0}>
      <View
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        backgroundColor="gray"
        borderRadius="l"
        minHeight={0.14 * width}
        paddingHorizontal="s"
        alignItems="center">
        <View
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center">
          <TouchableOpacity>
            <Icon name="attach" color={colors.bluePrimary} size={24} />
          </TouchableOpacity>
          <TextInput
            style={{flex: 1, fontFamily: fonts.GilroyMedium}}
            multiline={true}
            placeholder="type your message"
          />
          <TouchableOpacity alignSelf="center">
            <Icon name="send" color={colors.bluePrimary} size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Input;
