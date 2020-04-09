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
import {auth} from '../../config/firebase';
import {useDispatch} from 'react-redux';
import {userLogout} from '../../store/actions/userData';
export default function Profile(props) {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, marginTop: 80}}>
      <View style={{alignSelf: 'center', alignItems: 'center'}}>
        <Avatar
          rounded
          title="u"
          source={require('../../assets/concha.png')}
          size={100}
          containerStyle={style.avatar}
        />
        <View>
          <Text style={style.name}>Name</Text>
          <Text style={style.email}>Bio</Text>
        </View>
      </View>
      <View style={style.line} />
      <ScrollView>
        <View style={style.block}>
          <Text style={{...style.titleBlock, marginTop: 15}}>Account</Text>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Icon
                reverse
                name="ios-person"
                type="ionicon"
                color="grey"
                size={15}
              />
              <Text style={style.list}>Change Profile</Text>
              <Icons name="chevron-right" size={13} style={style.icons} />
            </View>
          </TouchableOpacity>
          <View style={style.line} />
          <Text style={{...style.titleBlock, marginTop: 15}}>App Theme</Text>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Icon
                reverse
                name="paint-brush"
                type="font-awesome"
                color="grey"
                size={15}
              />
              <Text style={style.list}>Change Color Theme</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Icon
                reverse
                name="cog"
                type="font-awesome"
                color="grey"
                size={15}
              />
              <Text style={style.list}>Change Background</Text>
            </View>
          </TouchableOpacity>
          <View style={style.line} />
          <Text style={{...style.titleBlock, marginTop: 15}}>About</Text>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Icon
                reverse
                name="ios-information-circle"
                type="ionicon"
                color="grey"
                size={15}
              />
              <Text style={style.list}>About us</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Button
              title="Log Out"
              buttonStyle={style.logout}
              onPress={() => {
                auth.signOut();
                dispatch(userLogout());
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
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
