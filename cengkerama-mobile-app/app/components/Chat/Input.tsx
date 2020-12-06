import React, {useState} from 'react';
import {Dimensions, TextInput} from 'react-native';
import {TouchableOpacity, View} from '../common';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '../../constant';

const {width} = Dimensions.get('window');

interface Props {
  onSend?: (messageText: string, isImage: boolean) => void;
}

const Input = ({onSend}: Props) => {
  const [messageText, setMessage] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<string>('');
  // send handler
  const send = () => {
    if (onSend) {
      onSend(messageText, false);
    }
    setMessage('');
  };
  return (
    <View
      backgroundColor="white"
      padding="m"
      width={width}
      position="absolute"
      elevation={3}
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
            value={messageText}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity alignSelf="center" onPress={send}>
            <Icon name="send" color={colors.bluePrimary} size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Input;
