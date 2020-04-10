import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './components/Main';
import RoomChat from '../screens/RoomChat/RoomChat';
import UpdateProfile from '../screens/Profile/ProfileUpdate';
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default PrivateNavigation;
