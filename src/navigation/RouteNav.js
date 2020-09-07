import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './TabNav';

const Stack = createStackNavigator();

export default function RouteNav(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='LocationScreen' component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
