import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Login from "../screens/Auth/Login";
import { AuthStackParams } from "../interface";

const StackNavigator = createSharedElementStackNavigator<AuthStackParams>();

const AuthStack = () => {
  return (
    <StackNavigator.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigator.Screen name="Login" component={Login} />
    </StackNavigator.Navigator>
  );
};

export default AuthStack;
