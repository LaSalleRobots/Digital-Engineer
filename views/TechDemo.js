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
import * as CameraTest from './CameraTest';
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
        <Tab.Screen
          name="Network"
          component={GQLApp.App}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name={`code-working-outline`} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Drawing"
          component={DrawingApp.App}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name={`pencil`} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={CameraTest.App}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name={`camera`} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
