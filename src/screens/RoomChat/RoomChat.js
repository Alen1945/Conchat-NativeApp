import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import Header from '../../components/Header';
import CustomAlert from '../../components/CustomAlert';
import {GiftedChat} from 'react-native-gifted-chat';

export default function RoomChat(props) {
  const messages = [
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 2,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#f1edee'}}>
      <Header Title={props.route.params.name} />
      <GiftedChat
        messages={messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}
