import React from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import {Toast} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-elements';
export default function Maps(props) {
  const [currentPosition, setCurrentPosition] = React.useState(
    props.route.params.location,
  );
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: currentPosition ? currentPosition.latitude : 0,
          longitude: currentPosition ? currentPosition.longitude : 0,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
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
                title={props.route.params.user.name.substr(0, 2)}
                source={
                  props.route.params.user.avatar && {
                    uri: props.route.params.user.avatar,
                  }
                }
              />
            </View>
            <Icon name="pin" size={30} color="red" />
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});
