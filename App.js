import React from 'react';
import {StyleSheet} from 'react-native';
import {Root, Container, Text, View} from 'native-base';
import Loading from './src/components/Loading';
import MainNavigation from './src/routes/MainNavigation';
import {store, persistor} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
export default function App(props) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root>
          <View style={style.mainView}>
            <MainNavigation />
          </View>
          <Loading />
        </Root>
      </PersistGate>
    </Provider>
  );
}
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
