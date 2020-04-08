import React from 'react';
import {StyleSheet} from 'react-native';
import {Root, Container, Text, View} from 'native-base';
import Loading from './src/components/Loading';
import Login from './src/screens/Login/Login';
export default function App(props) {
  return (
    <Root>
      <Loading />
      <View style={style.mainView}>
        <Login />
      </View>
    </Root>
  );
}
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
