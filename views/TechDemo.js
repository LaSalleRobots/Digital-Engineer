import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as GQLApp from './GQLTest';
import * as DrawingApp from './DrawingTest';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#83b2d0',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Network" component={GQLApp.App}></Tab.Screen>
        <Tab.Screen name="Drawing" component={DrawingApp.App}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
