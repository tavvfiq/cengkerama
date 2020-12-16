import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-community/google-signin";
import React, { useRef } from "react";
import { Dimensions, TextInput } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";
import { useSetRecoilState } from "recoil";

import { BorderlessButton, Text, View } from "../../components/common";
import { colors, fonts } from "../../constant";
import Layout from "../../layout";
import { authAtom } from "../../store/authentication";

const { width } = Dimensions.get("window");

const initialInputValue = {
  phoneNumber: "",
  otp: "",
  displayName: "",
};

GoogleSignin.configure();

const Login = () => {
  const setState = useSetRecoilState(authAtom);
  const inputField = useRef<{ [key: string]: string }>(initialInputValue);
  const translateX = useSharedValue<number>(0);

  const handleLoginWithPhoneNumber = () => {
    translateX.value = -width;
  };

  const verify = () => {
    console.log(inputField.current);
    translateX.value = -2 * width;
  };
  const handleLoginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      setState(() => {
        return {
          token: userInfo.idToken as string,
          user: {
            id: userInfo.user.id,
            displayName: userInfo.user.name as string,
            email: userInfo.user.email,
            profilePicture: userInfo.user.photo as string,
          },
          isLoggedIn: true,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };
  const styles = useAnimatedStyle(() => {
    return {
      flexDirection: "row",
      width: 4 * width,
      transform: [{ translateX: withTiming(translateX.value) }],
    };
  });
  return (
    <Layout>
      <View flex={1} flexDirection="column" justifyContent="center">
        <View flexDirection="column" marginBottom="s" justifyContent="center">
          <Text variant="banner" style={{ paddingLeft: 70 }}>
            cengke-
          </Text>
          <Text
            variant="banner"
            style={{ alignSelf: "flex-end", paddingRight: 70 }}
          >
            rama
          </Text>
        </View>
        <Animated.View style={styles}>
          <View
            flexDirection="column"
            justifyContent="space-evenly"
            marginTop="m"
            width={width}
          >
            <View
              alignSelf="center"
              marginBottom="s"
              style={{ paddingHorizontal: 48 }}
            >
              <Text textAlign="center" variant="profileSubmenu">
                Welcome to cengkerama.
              </Text>
              <Text textAlign="center" variant="profileSubmenu">
                Please sign in to start ber-cengkerama!
              </Text>
            </View>
            <BorderlessButton
              onPress={handleLoginWithPhoneNumber}
              width={0.74 * width}
              height={0.102 * width}
              borderRadius="s"
              backgroundColor="bluePrimary"
              alignSelf="center"
              flexDirection="row"
              justifyContent="flex-start"
              overflow="hidden"
              style={{ elevation: 3, borderRadius: 4, paddingHorizontal: 2 }}
            >
              <View
                width={0.092 * width}
                height={0.092 * width}
                backgroundColor="white"
                justifyContent="center"
                alignItems="center"
                alignSelf="center"
                style={{ borderRadius: 2 }}
              >
                <Icon
                  name="call"
                  size={20}
                  color={colors.bluePrimary}
                  style={{ alignSelf: "center" }}
                />
              </View>
              <Text
                textAlign="center"
                variant="authButton"
                style={{ alignSelf: "center", flex: 1 }}
              >
                Sign in with phone number
              </Text>
            </BorderlessButton>
            <GoogleSigninButton
              onPress={handleLoginWithGoogle}
              style={{ alignSelf: "center" }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
            />
          </View>
          <View
            marginTop="m"
            width={width}
            style={{ paddingHorizontal: 48 }}
            flexDirection="column"
            justifyContent="flex-start"
          >
            <Text textAlign="center" variant="profileSubmenu">
              cengkerama will send you SMS to verify your phone number.
            </Text>
            <View
              alignSelf="center"
              marginTop="s"
              width="100%"
              alignItems="center"
              backgroundColor="gray"
              borderRadius="s"
              paddingHorizontal="s"
            >
              <TextInput
                placeholder="enter your phone number"
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontFamily: fonts.GilroyMedium,
                }}
                onChangeText={(text) => {
                  inputField.current.phoneNumber = text;
                }}
              />
            </View>
            <BorderlessButton
              width="100%"
              height={0.102 * width}
              borderRadius="s"
              backgroundColor="bluePrimary"
              alignSelf="center"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              marginTop="s"
              onPress={verify}
              style={{ elevation: 2, borderRadius: 4, paddingHorizontal: 2 }}
            >
              <Text variant="authButton" style={{ alignSelf: "center" }}>
                Sure
              </Text>
            </BorderlessButton>
          </View>
          <View
            marginTop="m"
            width={width}
            style={{ paddingHorizontal: 48 }}
            flexDirection="column"
            justifyContent="flex-start"
          >
            <Text textAlign="center" variant="profileSubmenu">
              We have sent the OTP code. Please enter it down below.
            </Text>
            <View
              alignSelf="center"
              marginTop="s"
              width="100%"
              alignItems="center"
              backgroundColor="gray"
              borderRadius="s"
              paddingHorizontal="s"
            >
              <TextInput
                placeholder="enter 6 digit OTP code"
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontFamily: fonts.GilroyMedium,
                }}
                onChangeText={(text) => {
                  inputField.current.otp = text;
                }}
              />
            </View>
            <BorderlessButton
              width="100%"
              height={0.102 * width}
              borderRadius="s"
              backgroundColor="bluePrimary"
              alignSelf="center"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              marginTop="s"
              onPress={() => {
                translateX.value = -3 * width;
              }}
              style={{ elevation: 2, borderRadius: 4, paddingHorizontal: 2 }}
            >
              <Text variant="authButton" style={{ alignSelf: "center" }}>
                Verify
              </Text>
            </BorderlessButton>
          </View>
          <View
            marginTop="m"
            width={width}
            style={{ paddingHorizontal: 48 }}
            flexDirection="column"
            justifyContent="flex-start"
          >
            <Text textAlign="center" variant="profileSubmenu">
              It seems that you havent set your display name. Please set one!
            </Text>
            <View
              alignSelf="center"
              marginTop="s"
              width="100%"
              alignItems="center"
              backgroundColor="gray"
              borderRadius="s"
              paddingHorizontal="s"
            >
              <TextInput
                placeholder="enter your display name"
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontFamily: fonts.GilroyMedium,
                }}
                onChangeText={(text) => {
                  inputField.current.displayName = text;
                }}
              />
            </View>
            <BorderlessButton
              width="100%"
              height={0.102 * width}
              borderRadius="s"
              backgroundColor="bluePrimary"
              alignSelf="center"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              marginTop="s"
              onPress={verify}
              style={{ elevation: 2, borderRadius: 4, paddingHorizontal: 2 }}
            >
              <Text variant="authButton" style={{ alignSelf: "center" }}>
                Start ber-cengkerama!
              </Text>
            </BorderlessButton>
          </View>
        </Animated.View>
      </View>
    </Layout>
  );
};

export default Login;
