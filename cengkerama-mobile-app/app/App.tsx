import React from 'react';
import {StyleSheet} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import theme from './theme/default';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import AppStack from './navigation/AppStack';

const StackNavigator = createNativeStackNavigator();

interface Props {}

const App = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>
          <StackNavigator.Screen name="AppStack" component={AppStack} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
