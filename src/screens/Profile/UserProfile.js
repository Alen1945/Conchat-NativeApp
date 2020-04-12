import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon, Avatar, Button} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome';
import {auth, firestore} from '../../config/firebase';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
export default function UserProfile(props) {
  const dispatch = useDispatch();
  const [dataProfile, setDataProfile] = React.useState({});
  const getUserProfile = async () => {
    console.log('id', props.route.params.idUser);
    await firestore
      .collection('Users')
      .doc(props.route.params.idUser)
      .onSnapshot((doc) => {
        setDataProfile({id: doc.id, ...doc.data()});
      });
  };
  React.useEffect(() => {
    getUserProfile();
  }, [props.route.params.idUser]);
  return (
    <>
      <Header />
      <View style={{flex: 1, marginTop: 80}}>
        <View style={{alignSelf: 'center', alignItems: 'center'}}>
          <Avatar
            rounded
            title="u"
            source={
              dataProfile.photoURL && {
                uri: dataProfile.photoURL,
              }
            }
            size={100}
            containerStyle={style.avatar}
          />
          <View>
            <Text style={style.name}>{dataProfile.displayName}</Text>
            <Text style={style.email}>{dataProfile.bio}</Text>
          </View>
        </View>
        <View style={style.line} />
        <ScrollView>
          <View style={style.block}>
            <Text style={{...style.titleBlock, marginTop: 15}}>Chat</Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('RoomChat', {
                  titleRoom: dataProfile.displayName,
                  iconRoom: dataProfile.photoURL,
                  secondUser: dataProfile.id,
                })
              }>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Icon
                  reverse
                  name="send"
                  type="material-iconst"
                  color="grey"
                  size={15}
                />
                <Text style={style.list}>Chat</Text>
                <Icons name="chevron-right" size={13} style={style.icons} />
              </View>
            </TouchableOpacity>
            <View style={style.line} />
            <Text style={{...style.titleBlock, marginTop: 15}}>Block</Text>
            <TouchableOpacity>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Icon
                  reverse
                  name="times"
                  type="font-awesome"
                  color="grey"
                  size={15}
                />
                <Text style={style.list}>Block</Text>
              </View>
            </TouchableOpacity>
            <View style={style.line} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
const style = StyleSheet.create({
  avatar: {
    marginTop: -70,
    borderWidth: 5,
    borderColor: '#f6f6f8',
    marginLeft: 15,
    padding: 0,
  },
  email: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 13,
    color: '#a6a6a6',
  },
  name: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    color: '#555555',
  },
  list: {
    fontWeight: '600',
    fontSize: 15,
    color: '#605f5f',
    marginLeft: 10,
    marginTop: 13,
  },
  line: {
    marginTop: 30,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'center',
  },
  icons: {
    color: '#c7c7c7',
    right: 0,
    width: 20,
    marginTop: 18,
    position: 'absolute',
  },
  block: {
    flex: 5,
    paddingHorizontal: 10,
    paddingLeft: 20,
    paddingTop: 20,
    marginBottom: 70,
  },
  titleBlock: {
    fontWeight: 'bold',
    color: '#4e4e4e',
    fontSize: 16,
  },
  logout: {
    marginTop: 20,
    width: '100%',
    borderRadius: 18,
    backgroundColor: '#26a1c6',
    paddingRight: 10,
    elevation: 4,
  },
  hastag: {
    marginTop: 10,
    fontSize: 13,
    color: 'grey',
    textAlign: 'right',
    marginRight: 10,
  },
});
