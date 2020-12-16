import React, { useEffect, useRef } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useRecoilValueLoadable } from "recoil";

import SplashScreen from "../screens/SplashScreen";
import { auth } from "../store/authentication";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const StackNavigator = createStackNavigator();

const AppContainer = () => {
  const loadable = useRecoilValueLoadable(auth);
  const navigation = useRef<NavigationContainerRef>();
  useEffect(() => {
    if (loadable.state === "hasValue") {
      const { isLoggedIn } = loadable.contents;
      const currentNavigationState = navigation.current?.getRootState();
      if (currentNavigationState) {
        if (isLoggedIn) {
          navigation.current?.reset({
            ...currentNavigationState,
            routes: [{ key: "AppStack", name: "AppStack" }],
            index: 0,
          });
        } else {
          navigation.current?.reset({
            ...currentNavigationState,
            routes: [{ key: "AuthStack", name: "AuthStack" }],
            index: 0,
          });
        }
      }
    }
  }, [loadable.state]);
  return (
    <NavigationContainer
      ref={(instance) => {
        if (instance) {
          navigation.current = instance;
        }
      }}
    >
      <StackNavigator.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <StackNavigator.Screen name="Splash" component={SplashScreen} />
        <StackNavigator.Screen name="AppStack" component={AppStack} />
        <StackNavigator.Screen name="AuthStack" component={AuthStack} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
