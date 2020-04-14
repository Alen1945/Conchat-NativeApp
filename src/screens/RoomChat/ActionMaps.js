import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import {Toast} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-elements';
import {auth, firebaseFunction} from '../../config/firebase';
export default function ActionsMaps(props) {
  const [currentPosition, setCurrentPosition] = React.useState(false);
  const handleSendThisLocation = async () => {
    if (currentPosition) {
      try {
        const result = await firebaseFunction.httpsCallable('createMessage')({
          idRoom: props.route.params.idRoom,
          text: '',
          location: {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          },
          createdAt: new Date().getTime(),
        });
        console.log(result);
        return props.navigation.goBack();
      } catch (err) {
        console.log(err);
      }
    } else {
      getPosition();
    }
  };
  const getPosition = () => {
    geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          console.log(position.coords);
          setCurrentPosition(position.coords);
        } else {
          getPosition();
        }
      },
      (err) => {
        if (err.code === 1) {
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
        } else if (err.code === 2) {
          Toast.show({
            text: 'Please active your Location',
            buttonText: 'Ok',
            duration: 15000,
            position: 'bottom',
          });
        }
      },
    );
  };
  React.useEffect(() => {
    getPosition();
    console.log('alen');
  }, []);
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: currentPosition
            ? currentPosition.latitude
            : -6.8205799999999995,
          longitude: currentPosition
            ? currentPosition.longitude
            : 106.81851166666665,
          latitudeDelta: 0.0095,
          longitudeDelta: 0.00921,
        }}>
        <Marker
          coordinate={{
            latitude: currentPosition ? currentPosition.latitude : 0,
            longitude: currentPosition ? currentPosition.longitude : 0,
          }}>
          <View style={{position: 'relative', alignItems: 'center'}}>
            <View>
              <Avatar
                rounded
                size={50}
                title={auth.currentUser.displayName.substr(0, 2)}
                source={
                  auth.currentUser.photoURL && {uri: auth.currentUser.photoURL}
                }
              />
            </View>
            <Icon name="pin" size={30} color="red" />
          </View>
        </Marker>
      </MapView>
      <View
        style={{
          position: 'absolute',
          height: 100,
          backgroundColor: '#fff',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => handleSendThisLocation()}>
          <View style={styles.iconAttac}>
            <Icon name="pin" size={10} color="#fff" />
          </View>
          <Text style={{fontSize: 15}}>Send This Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', marginVertical: 15}}
          onPress={() => props.navigation.navigate('ActionsMap')}>
          <View style={styles.iconAttac}>
            <Icon name="camera" size={10} color="#fff" />
          </View>
          <Text style={{fontSize: 15}}>Send Current Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
  iconAttac: {
    elevation: 2,
    marginRight: 4,
    borderRadius: 30,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#26a1c6',
  },
});
