import { GoogleSigninButton } from "@react-native-community/google-signin";
import React, { useEffect, useRef } from "react";
import { Dimensions, TextInput } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";

import { BorderlessButton, Text, View } from "../../components/common";
import { colors, fonts } from "../../constant";
import useAuthentication from "../../hooks/useAuthentication";
import Layout from "../../layout";

const { width } = Dimensions.get("window");

const buttonHeight = 0.11 * width;

const initialInputValue = {
  phoneNumber: "",
  otp: "",
  displayName: "",
};

const Login = () => {
  const [
    isError,
    loading,
    signInWithGoogle,
    signInWithPhoneNumber,
    confirmCode,
    setDisplayName,
  ] = useAuthentication();
  const inputField = useRef<{ [key: string]: string }>(initialInputValue);
  const index = useRef(0);
  const translateX = useSharedValue<number>(0);

  const withPhoneNumber = () => {
    if (inputField.current.phoneNumber === "") {
      return;
    }
    signInWithPhoneNumber(inputField.current.phoneNumber);
  };

  useEffect(() => {
    if (!isError && !loading) {
      index.current++;
      if (index.current > 1 && index.current < 4) {
        translateX.value = -index.current * width;
      }
    }
  }, [isError, loading]);

  const verify = () => {
    if (inputField.current.otp === "") {
      return;
    }
    confirmCode(inputField.current.otp);
  };

  const _setDisplayName = () => {
    if (inputField.current.displayName === "") {
      return;
    }
    setDisplayName(inputField.current.displayName);
  };

  const handleLoginWithGoogle = () => {
    signInWithGoogle();
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
              onPress={() => {
                if (index.current === 0) {
                  index.current++;
                }
                translateX.value = -index.current * width;
              }}
              width={0.845 * width}
              height={buttonHeight}
              borderRadius="s"
              backgroundColor="bluePrimary"
              alignSelf="center"
              flexDirection="row"
              justifyContent="flex-start"
              overflow="hidden"
              disabled={loading}
              containerStyle={{
                elevation: 3,
                backgroundColor: "white",
                width: 0.845 * width,
                alignSelf: "center",
                borderRadius: 14,
              }}
              style={{ borderRadius: 4, paddingHorizontal: 2 }}
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
              height={buttonHeight}
              borderRadius="s"
              backgroundColor="bluePrimary"
              alignSelf="center"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              marginTop="s"
              onPress={withPhoneNumber}
              loading={loading}
              disabled={loading}
              style={{ elevation: 2, borderRadius: 4, paddingHorizontal: 2 }}
            >
              <Text variant="authButton" style={{ alignSelf: "center" }}>
                Sure
              </Text>
            </BorderlessButton>
            <BorderlessButton
              width="100%"
              height={buttonHeight}
              borderRadius="s"
              backgroundColor="bluePrimary"
              alignSelf="center"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              marginTop="s"
              onPress={() => {
                index.current--;
                translateX.value = -index.current * width;
              }}
              loading={loading}
              disabled={loading}
              style={{ elevation: 2, borderRadius: 4, paddingHorizontal: 2 }}
            >
              <Text variant="authButton" style={{ alignSelf: "center" }}>
                Change Sign In method
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
              height={buttonHeight}
              borderRadius="s"
              backgroundColor="bluePrimary"
              alignSelf="center"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              marginTop="s"
              loading={loading}
              disabled={loading}
              onPress={verify}
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
              height={buttonHeight}
              borderRadius="s"
              backgroundColor="bluePrimary"
              alignSelf="center"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              marginTop="s"
              onPress={_setDisplayName}
              loading={loading}
              disabled={loading}
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
