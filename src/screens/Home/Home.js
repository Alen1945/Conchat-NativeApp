import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
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
import {auth, db, firestore} from '../../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Home(props) {
  const [idListChat, setIdListChat] = React.useState([]);
  const [listChat, setListChat] = React.useState({});
  const [isVisibleOverlay, setIsVisibleOverlay] = React.useState(false);
  const [listContact, setListContact] = React.useState([]);
  const getIdListChat = async () => {
    try {
      firestore
        .collection('Users')
        .doc(`${auth.currentUser.uid}`)
        .collection('ListChat')
        .onSnapshot((snapshot) => {
          setIdListChat(
            snapshot.docs.reduce((list, data) => [...list, data.data().id], []),
          );
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getListChat = async () => {
    try {
      if (idListChat && idListChat.length > 0) {
        idListChat.forEach(async (v) => {
          firestore
            .collection('RoomChat')
            .doc(v)
            .onSnapshot(async (snapshot) => {
              const snapData = snapshot.data();
              if (snapData.type === 'DIRECT_MESSAGE') {
                const idAnotherUser = Object.keys(snapData.member).filter(
                  (v) => v !== auth.currentUser.uid,
                )[0];
                await firestore
                  .collection('Users')
                  .doc(idAnotherUser)
                  .onSnapshot((data) => {
                    const dataVal = data.data();
                    if (dataVal) {
                      setListChat((prevState) => ({
                        ...prevState,
                        [snapData.id]: {
                          ...snapData,
                          titleRoom: dataVal.displayName || dataVal.phoneNumber,
                          secondUser: idAnotherUser,
                          iconRoom: dataVal.photoURL || '',
                        },
                      }));
                    }
                  });
              } else {
                setListChat((prevState) => ({
                  ...prevState,
                  [snapData.id]: snapData,
                }));
              }
            });
        });
      }
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
          searchResult.docs.forEach((user) => (data[user.id] = user.data()));
          console.log(data);
          setListContact(data);
        }
      } else if (name.length === 0) {
        const searchResult = await firestore.collection('Users').get();
        if (searchResult.docs) {
          searchResult.docs.forEach((user) => (data[user.id] = user.data()));
          setListContact(data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getIdListChat();
    handleSearchContact();
  }, []);

  React.useEffect(() => {
    getListChat();
  }, [idListChat]);
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
                            title="U"
                            size={50}
                            rounded
                            source={{uri: user.photoURL}}
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
