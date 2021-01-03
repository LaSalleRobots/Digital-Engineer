import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as NewNote from './NewNote';
import * as DrawingTest from './DrawingTest';
import * as NoteCardView from './NoteCardView';
import {CameraTester} from './CameraView';
import {SearchView} from './SearchView';
import Icon from 'react-native-vector-icons/Ionicons';
import {QueryClient, QueryClientProvider, useQueryClient} from 'react-query';

const Tab = createBottomTabNavigator();

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={DefaultTheme}>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#83b2d0',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Feed" component={SearchView} />
          <Tab.Screen name="CameraView" component={CameraTester} />
          <Tab.Screen name="NewNote" component={NewNote.App} />
          <Tab.Screen name="DrawingTest" component={DrawingTest.App} />
          <Tab.Screen name="NoteCardView" component={NoteCardView.App} />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
