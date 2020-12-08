import React from "react";
// import {createStackNavigator} from '@react-navigation/stack';
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Main from "../screens/Main";
import Room from "../screens/Room";
import ImageView from "../screens/ImageView";
import { AppStackParams } from "../interface";

const StackNavigator = createSharedElementStackNavigator<AppStackParams>();

const AppStack = () => {
  return (
    <StackNavigator.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: "rgba(0,0,0,0.7)" },
      }}
    >
      <StackNavigator.Screen name="Main" component={Main} />
      <StackNavigator.Screen name="Room" component={Room} />
      <StackNavigator.Screen
        name="ImageView"
        component={ImageView}
        sharedElements={(route) => {
          return [route.params.id];
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default AppStack;
