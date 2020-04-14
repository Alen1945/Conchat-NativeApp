import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
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
import {Avatar, Overlay, Input} from 'react-native-elements';
import {auth, firestore} from '../../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {addListChat} from '../../store/actions/listChatData';
export default function Home(props) {
  const listChat = useSelector((state) => state.listChatData || {});
  const [isVisibleOverlay, setIsVisibleOverlay] = React.useState(false);
  const [listContact, setListContact] = React.useState([]);
  const dispatch = useDispatch();
  const getListChat = () => {
    try {
      firestore
        .collection('RoomChat')
        .where(`member.${auth.currentUser.uid}`, '==', true)
        .onSnapshot((rooms) => {
          if (rooms) {
            rooms.docs.reduce((allRoom, room) => {
              const roomData = room.data();
              if (roomData.lastAddedMessage) {
                if (roomData.type === 'DIRECT_MESSAGE') {
                  const idAnotherUser = Object.keys(roomData.member).filter(
                    (v) => v !== auth.currentUser.uid,
                  )[0];
                  firestore
                    .collection('Users')
                    .doc(idAnotherUser)
                    .onSnapshot((data) => {
                      const dataVal = data.data();
                      if (dataVal) {
                        dispatch(
                          addListChat({
                            ...allRoom,
                            [room.id]: {
                              ...roomData,
                              titleRoom:
                                dataVal.displayName || dataVal.phoneNumber,
                              secondUser: idAnotherUser,
                              iconRoom: dataVal.photoURL || '',
                            },
                          }),
                        );
                      }
                    });
                } else {
                  dispatch(
                    addListChat({
                      ...allRoom,
                      [room.id]: roomData,
                    }),
                  );
                }
              }
            }, {});
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearchContact = async (name = '') => {
    try {
      let data = {};
      if (name.length > 1) {
        const searchResult = await firestore
          .collection('Users')
          .where('displayName', '==', name)
          .limit(30)
          .get();
        if (searchResult.docs) {
          searchResult.docs.forEach((user) => {
            if (user.id === auth.currentUser.uid) {
              return (data[user.id] = {...user.data(), displayName: 'You'});
            }
            return (data[user.id] = user.data());
          });
          setListContact(data);
        }
      } else if (name.length === 0) {
        const searchResult = await firestore.collection('Users').get();
        if (searchResult.docs) {
          searchResult.docs.forEach((user) => {
            if (user.id === auth.currentUser.uid) {
              return (data[user.id] = {...user.data(), displayName: 'You'});
            }
            return (data[user.id] = user.data());
          });
          setListContact(data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getListChat();
    handleSearchContact();
  }, []);

  return (
    <>
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
                        secondUser: room.secondUser,
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
                        {!room.lastMessage && room.location && 'Location'}
                        {!room.lastMessage && room.image && 'Image'}
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
            {!(Object.keys(listChat).length > 0) && (
              <View
                style={{
                  height: 200,
                  width: 200,
                  marginTop: 100,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <ImageBackground
                  source={require('../../assets/empty.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </View>
            )}
          </List>
        </Content>
        <View style={style.containerAddChat}>
          <TouchableOpacity
            style={style.btnAddChat}
            onPress={() => setIsVisibleOverlay(true)}>
            <Icon name="plus" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </Container>
      {isVisibleOverlay && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: 20,
            backgroundColor: '#fff',
          }}>
          <View style={{flex: 1, position: 'relative'}}>
            <TouchableOpacity
              style={{position: 'absolute', top: 0, left: 10}}
              onPress={() => setIsVisibleOverlay(false)}>
              <Icon name="times" size={27} color="#666" />
            </TouchableOpacity>
            <Text style={style.headingSearch}>Select User</Text>
            <Input
              placeholder="name"
              onChangeText={(text) => handleSearchContact(text)}
              inputContainerStyle={{...style.input}}
              inputStyle={style.inputText}
            />
            {Object.values(listContact).length > 0 && (
              <Content
                style={{
                  marginTop: 20,
                }}>
                <List style={{paddingRight: 30}}>
                  {Object.keys(listContact).map((key, i) => {
                    const user = listContact[key];
                    return (
                      <ListItem
                        key={i}
                        avatar
                        button
                        style={{marginVertical: 6}}
                        onPress={() =>
                          props.navigation.navigate('RoomChat', {
                            titleRoom: user.displayName,
                            iconRoom: user.photoURL,
                            secondUser: key,
                          })
                        }>
                        <Left>
                          <Avatar
                            size={50}
                            rounded
                            source={user.photoURL && {uri: user.photoURL}}
                            title="U"
                          />
                        </Left>
                        <Body>
                          <Text>{user.displayName}</Text>
                          <Text note>{user.phoneNumber}</Text>
                        </Body>
                        <Right>
                          <Text note>
                            {user.isOnline ? 'Online' : 'Offline'}
                          </Text>
                        </Right>
                      </ListItem>
                    );
                  })}
                </List>
              </Content>
            )}
          </View>
        </View>
      )}
    </>
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
  headingSearch: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#eaeaea',
  },
  inputText: {
    fontSize: 13,
    color: '#525252',
    textAlign: 'center',
  },
});
