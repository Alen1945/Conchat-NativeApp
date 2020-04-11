import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {db, auth, firebaseFunction, firestore} from '../../config/firebase';
import Header from '../../components/Header';
import CustomAlert from '../../components/CustomAlert';
import {GiftedChat} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function RoomChat(props) {
  const {titleRoom, iconRoom} = props.route.params;
  const [idRoom, setIdRoom] = React.useState(props.route.idRoom);
  const [messages, setMessages] = React.useState([]);
  const onSendMessage = async (sendMessage) => {
    try {
      firebaseFunction.httpsCallable('createMessage')({
        idRoom,
        text: sendMessage[0].text,
        createdAt: `${sendMessage[0].createdAt}`,
      });
    } catch (err) {
      err;
    }
  };
  React.useEffect(() => {
    if (auth.currentUser.uid === props.route.params.secondUser) {
      return props.navigation.navigate('Home');
    }
    if (idRoom) {
      firestore
        .collection('RoomMessage')
        .doc(`${idRoom}`)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((message) => ({
              _id: message.id,
              text: message.data().text,
              createdAt: new Date(message.data().createdAt),
              user: {
                _id: message.data().user,
                name:
                  auth.currentUser.uid === message.data().user
                    ? auth.currentUser.displayName ||
                      auth.currentUser.phoneNumber
                    : titleRoom,
                avatar:
                  auth.currentUser.uid === message.data().user
                    ? auth.currentUser.photoURL
                    : iconRoom,
              },
            })),
          );
        });
    } else {
      firebaseFunction
        .httpsCallable('getOrCreateRoom')({
          secondUser: props.route.params.secondUser,
        })
        .then((result) => {
          setIdRoom(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [idRoom]);
  return (
    <>
      {idRoom && (
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
      )}
    </>
  );
}
