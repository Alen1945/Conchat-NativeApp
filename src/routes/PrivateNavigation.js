import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './components/Main';
import RoomChat from '../screens/RoomChat/RoomChat';
import UpdateProfile from '../screens/Profile/ProfileUpdate';
import UserProfile from '../screens/Profile/UserProfile';
import ActionsMap from '../screens/RoomChat/ActionMaps';
import Maps from '../screens/Maps/Maps';
import ActionsImage from '../screens/RoomChat/ActionImage';
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
          <Stack.Screen name="ActionsMap" component={ActionsMap} />
          <Stack.Screen name="Maps" component={Maps} />
          <Stack.Screen name="ActionsImage" component={ActionsImage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default PrivateNavigation;
