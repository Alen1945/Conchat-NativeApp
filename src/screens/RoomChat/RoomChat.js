import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {db, auth} from '../../config/firebase';
import Header from '../../components/Header';
import CustomAlert from '../../components/CustomAlert';
import {GiftedChat} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function RoomChat(props) {
  const {idRoom, titleRoom, iconRoom} = props.route.params;
  const [messages, setMessages] = React.useState([]);
  const onSendMessage = (sendMessage) => {
    db.ref(`/RoomChat/${idRoom}`).update({
      lastMessage: sendMessage[0].text,
      lastAddedMessage: `${sendMessage[0].createdAt}`,
    });
    db.ref(`/RoomMessage/${idRoom}/${sendMessage[0]._id}`).set({
      user: sendMessage[0].user._id,
      text: sendMessage[0].text,
      createdAt: `${sendMessage[0].createdAt}`,
    });
  };
  React.useEffect(() => {
    db.ref(`/RoomMessage/${idRoom}`).on('value', (result) => {
      if (result) {
        setMessages(
          Object.values(result.val())
            .map((message, i) => ({
              _id: i,
              text: message.text,
              createdAt: new Date(message.createdAt),
              user: {
                _id: message.user,
                name:
                  auth.currentUser.uid === message.user
                    ? auth.currentUser.displayName ||
                      auth.currentUser.phoneNumber
                    : titleRoom,
                avatar:
                  auth.currentUser.uid === message.user
                    ? auth.currentUser.photoURL
                    : iconRoom,
              },
            }))
            .sort((a, b) => {
              let adate = new Date(a.createdAt);
              let bdate = new Date(b.createdAt);
              return adate > bdate ? -1 : adate < bdate ? 1 : 0;
            }),
        );
      }
    });
  }, [idRoom]);
  return (
    <>
      <GiftedChat
        styles={{flex: 1}}
        messages={messages}
        onSend={(sendMessage) => onSendMessage(sendMessage)}
        user={{
          _id: auth.currentUser.uid,
        }}
        alwaysShowSend={true}
        renderActions={() => <Icon name="image" size={30} color="#000" />}
      />
    </>
  );
}
