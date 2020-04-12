import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {db, auth, firebaseFunction, firestore} from '../../config/firebase';
import Header from '../../components/Header';
import CustomAlert from '../../components/CustomAlert';
import {GiftedChat, Send, Actions, Bubble} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RoomChat(props) {
  const {titleRoom, iconRoom} = props.route.params;
  const [idRoom, setIdRoom] = React.useState(props.route.idRoom);
  const [messages, setMessages] = React.useState([]);
  const [isVisibleAttach, setIsVisibleAttach] = React.useState(false);
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
              location: 'alen',
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
        <>
          <View
            style={{
              backgroundColor: '#26a1c6',
              height: 60,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{width: 50, position: 'absolute'}}
              onPress={props.navigation.goBack}>
              <Icon
                name="chevron-left"
                size={30}
                color="#fff"
                style={style.backIcon}
              />
            </TouchableOpacity>

            <View style={style.container}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('UserProfile', {
                    idUser: props.route.params.secondUser,
                  })
                }>
                <Text style={style.title}>{titleRoom}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <GiftedChat
            messages={messages}
            onSend={(sendMessage) => onSendMessage(sendMessage)}
            user={{
              _id: auth.currentUser.uid,
            }}
            alwaysShowSend={true}
            listViewProps={{
              style: {
                backgroundColor: 'white',
              },
            }}
            // renderCustomView={(props) => {
            //   if (props.currentMessage.location) {
            //     return (
            //       <Text>alen</Text>
            //       // <TouchableOpacity
            //       //   style={[styles.container, containerStyle]}
            //       //   onPress={this.openMapAsync}>
            //       //   <MapView
            //       //     style={[styles.mapView, mapViewStyle]}
            //       //     region={{
            //       //       latitude: currentMessage.location.latitude,
            //       //       longitude: currentMessage.location.longitude,
            //       //       latitudeDelta: 0.0922,
            //       //       longitudeDelta: 0.0421,
            //       //     }}
            //       //     scrollEnabled={false}
            //       //     zoomEnabled={false}
            //       //   />
            //       // </TouchableOpacity>
            //     );
            //   }
            // }}
            renderSend={(props) => (
              <Send {...props}>
                <View
                  style={{
                    alignSelf: 'center',
                    right: 10,
                    bottom: 2,
                    elevation: 2,
                    padding: 2,
                    borderRadius: 20,
                    height: 40,
                    width: 40,
                    backgroundColor: '#26a1c6',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="send" size={20} color="#fff"></Icon>
                </View>
              </Send>
            )}
            renderActions={() => (
              <TouchableOpacity
                style={{alignSelf: 'center', left: 5}}
                onPress={() => setIsVisibleAttach(true)}>
                <View>
                  <Icon name="note" size={30} color="#26a1c6"></Icon>
                </View>
              </TouchableOpacity>
            )}>
            <Text>alen</Text>
          </GiftedChat>
          {isVisibleAttach && (
            <View
              style={{
                position: 'absolute',
                height: 100,
                backgroundColor: '#fff',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 6,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={style.iconAttac}>
                <Icon name="image" size={30} color="#fff"></Icon>
              </View>
              <View style={style.iconAttac}>
                <Icon name="camera" size={30} color="#fff"></Icon>
              </View>
              <View style={style.iconAttac}>
                <Icon name="pin" size={30} color="#fff"></Icon>
              </View>
              <TouchableOpacity
                onPress={() => setIsVisibleAttach(false)}
                style={{position: 'absolute', top: 5, left: 10}}>
                <Icon name="close" size={27} color="#666" />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  iconAttac: {
    marginHorizontal: 10,
    elevation: 2,
    borderRadius: 30,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#26a1c6',
  },
});
