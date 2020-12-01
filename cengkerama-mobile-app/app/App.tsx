import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from './components/common';
import {ThemeProvider} from '@shopify/restyle';
import theme from './theme/default';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './screens/Main';

const StackNavigator = createStackNavigator();

interface Props {}

const App = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StackNavigator.Navigator headerMode="none">
          <StackNavigator.Screen name="Main" component={Main} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
