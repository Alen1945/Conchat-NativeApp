import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Spinner, Text} from 'native-base';

export default function Loading(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      {isLoading && (
        <View style={style.container}>
          <Spinner color="#23b8bc" />
        </View>
      )}
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.09)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
