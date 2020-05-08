import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';

const initialRegion = {
  longitude: -122,
  latitude: 37,
  longitudeDelta: 0.04,
  latitudeDelta: 0.09
}
const MapScreen = () => {
  const [region, setRegion] = useState(initialRegion)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => setMapLoaded(true), [])

  if(!mapLoaded) {
    <View style={{flex:1, justifyContent: 'center'}}>
      <ActivityIndicator size='large' />
    </View>
  }
  return (
    <View style={styles.container}>
      <MapView
        region={region}
        style={styles.mapStyle}
        />
    </View>
  )
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});