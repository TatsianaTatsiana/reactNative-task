import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocationScreen from '../pages/location/LocationScreen';
import HistoryScreen from '../pages/history/HistoryScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const COLOR_ICON = '#3455db';

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLOR_ICON,
        inactiveTintColor: '#999999',
      }}
    >
      <Tab.Screen
        name='Location'
        component={LocationScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name='location-on' size={30} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name='History'
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name='cake' size={30} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
