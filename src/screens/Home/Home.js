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
      db.ref('/')
        .once('value')
        .then((value) => {
          console.log(value);
        });
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
          const room = await db.ref('/RoomChat/' + v).once('value');
          const roomVal = room.val();
          if (roomVal.type === 'DIRECT_MESSAGE') {
            const anotherUser = roomVal.member.filter(
              (v) => v !== auth.currentUser.uid,
            )[0];

            setListChat((prevState) => ({...prevState, [room.key]: roomVal}));
          } else {
            setListChat((prevState) => ({...prevState, [room.key]: roomVal}));
          }
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
                    props.navigation.navigate('RoomChat', {idRoom: idRoom})
                  }>
                  <Left>
                    <Avatar
                      title="u"
                      size={50}
                      rounded
                      source={require('../../assets/concha.png')}
                    />
                  </Left>
                  <Body>
                    <Text>Alen</Text>
                    <Text note>
                      {room.lastMessage.substring(0, 15)}
                      {room.lastMessage.length > 15 && '...'}
                    </Text>
                  </Body>
                  <Right>
                    <Text note>
                      {new Date(room.lastaddedMessage).getHours() +
                        ':' +
                        new Date(room.lastaddedMessage).getMinutes()}
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
