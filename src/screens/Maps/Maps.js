import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
export default function Maps(props) {
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: -6.876123,
          longitude: 103.2923,
          latitudeDelta: 0.00225,
          longitudeDelta: 0.02521,
        }}>
        <Marker
          coordinate={{
            latitude: -6.876123,
            longitude: 103.2923,
          }}
        />
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
