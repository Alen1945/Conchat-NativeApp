import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Text,
} from 'native-base';
import {Avatar} from 'react-native-elements';
import {auth, db} from '../../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Home(props) {
  const [idListChat, setIdListChat] = React.useState([]);
  const [listChat, setListChat] = React.useState({});
  const getIdListChat = async () => {
    try {
      const listIdRoom = await db
        .ref(`/Profiles/${auth.currentUser.uid}/listRoomChat`)
        .once('value');
      if (listIdRoom.val() && listIdRoom.val().length > 0) {
        setIdListChat(listIdRoom.val());
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getListChat = async () => {
    try {
      if (idListChat && idListChat.length > 0) {
        idListChat.forEach(async (v) => {
          db.ref('/RoomChat/' + v).on('value', async (room) => {
            console.log(room);
            const roomVal = room.val();
            if (roomVal.type === 'DIRECT_MESSAGE') {
              const idAnotherUser = roomVal.member.filter(
                (v) => v !== auth.currentUser.uid,
              )[0];
              const anotherUser = await db
                .ref(`/Users/${idAnotherUser}`)
                .once('value');
              if (anotherUser.val()) {
                setListChat((prevState) => ({
                  ...prevState,
                  [room.key]: {
                    ...roomVal,
                    titleRoom:
                      anotherUser.val().displayName ||
                      anotherUser.val().phoneNumber,
                    iconRoom: anotherUser.val().photoURL || '',
                  },
                }));
              } else {
                setListChat((prevState) => ({
                  ...prevState,
                  [room.key]: roomVal,
                }));
              }
            } else {
              setListChat((prevState) => ({...prevState, [room.key]: roomVal}));
            }
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getIdListChat();
  }, []);

  React.useEffect(() => {
    getListChat();
  }, [idListChat]);
  return (
    <Container>
      <Content>
        <List>
          {Object.keys(listChat).length > 0 &&
            Object.keys(listChat).map((idRoom, i) => {
              const room = listChat[idRoom];
              return (
                <ListItem
                  key={idRoom}
                  avatar
                  button
                  onPress={() =>
                    props.navigation.navigate('RoomChat', {
                      idRoom: idRoom,
                      titleRoom: room.titleRoom,
                      iconRoom: room.iconRoom,
                    })
                  }>
                  <Left>
                    <Avatar
                      title="U"
                      size={50}
                      rounded
                      source={room.iconRoom && {uri: room.iconRoom}}
                    />
                  </Left>
                  <Body>
                    <Text>{room.titleRoom}</Text>
                    <Text note>
                      {room.lastMessage && room.lastMessage.substring(0, 15)}
                      {room.lastMessage &&
                        room.lastMessage.length > 15 &&
                        '...'}
                    </Text>
                  </Body>
                  <Right>
                    <Text note>
                      {new Date(room.lastAddedMessage).getHours() +
                        ':' +
                        new Date(room.lastAddedMessage).getMinutes()}
                    </Text>
                  </Right>
                </ListItem>
              );
            })}
        </List>
      </Content>
      <View style={style.containerAddChat}>
        <TouchableOpacity style={style.btnAddChat}>
          <Icon name="plus" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const style = StyleSheet.create({
  containerAddChat: {
    position: 'absolute',
    height: 55,
    width: 55,
    right: 20,
    bottom: 40,
  },
  btnAddChat: {
    width: '100%',
    height: '100%',
    backgroundColor: '#26a1c6',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
