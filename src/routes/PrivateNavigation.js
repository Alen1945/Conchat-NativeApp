import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './components/Main';
import RoomChat from '../screens/RoomChat/RoomChat';
import UpdateProfile from '../screens/Profile/ProfileUpdate';
import UserProfile from '../screens/Profile/UserProfile';
function PrivateNavigation(props) {
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="RoomChat" component={RoomChat} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default PrivateNavigation;
