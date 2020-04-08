import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './components/Main';

function PrivateNavigation(props) {
  const Stack = createStackNavigator();
  return (
    <>
      <View style={style.headerContainer}>
        <Text style={style.headerTitle}>Conchat</Text>
      </View>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
const style = StyleSheet.create({
  headerContainer: {
    padding: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#444',
  },
});
export default PrivateNavigation;
