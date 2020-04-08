import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
export default function Header(props) {
  const navigation = useNavigation();
  return (
    <View style={{flex: 2, paddingBottom: 20}}>
      <TouchableOpacity
        style={{width: 50, marginTop: 25}}
        onPress={navigation.goBack}>
        <Icon name="chevron-left" size={20} style={style.backIcon} />
      </TouchableOpacity>
      <View style={style.container}>
        <Text style={style.title}>{props.Title}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4f4f4f',
    marginTop: 15,
  },
  backIcon: {
    color: '#4f4f4f',
    marginLeft: 15,
    width: 20,
  },
});
