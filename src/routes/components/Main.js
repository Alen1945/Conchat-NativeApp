import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../../screens/Home/Home';
import Profile from '../../screens/Profile/Profile';
import Maps from '../../screens/Maps/Maps';
const Tab = createMaterialTopTabNavigator();

export default function TopupNavigate() {
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showIcon: true,
          activeTintColor: '#26a1c6',
          inactiveTintColor: '#6d6d6d',
          pressColor: 'grey',
          pressOpacity: 'black',

          labelStyle: {
            fontSize: 16,
            textTransform: 'capitalize',
            fontWeight: '800',
          },
          indicatorStyle: {backgroundColor: '#26a1c6'},
          style: {
            backgroundColor: 'white',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Chat',
          }}
        />
        <Tab.Screen
          name="Maps"
          component={Maps}
          options={{
            title: 'Nearby',
          }}
        />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
}
