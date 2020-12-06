import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screens/Main';
import Room from '../screens/Room';

const StackNavigator = createStackNavigator();

interface Props {}

const AppStack = (props: Props) => {
  return (
    <StackNavigator.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <StackNavigator.Screen name="Main" component={Main} />
      <StackNavigator.Screen name="Room" component={Room} />
    </StackNavigator.Navigator>
  );
};

export default AppStack;
