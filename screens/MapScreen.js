import React, {useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Dimensions, View } from "react-native";
import MapView from 'react-native-maps';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { data } from '../mockData/mock'
import * as actions from '../actions'

const INITIAL_REGION = {
  longitude: -122,
  latitude: 37,
  longitudeDelta: 0.04,
  latitudeDelta: 0.09
}
const MapScreen = ({fetchJobs, navigation}) => {
  const [region, setRegion] = useState(INITIAL_REGION)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => setMapLoaded(true), [])

  const onRegionChangeComplete = (region) => {
    setRegion(region)
  }

  const onButtonPress = () => {
    fetchJobs(region, () => {
      navigation.navigate('deck');
    });
  }

  if (!mapLoaded) {
    <View style={{flex:1, justifyContent: 'center'}}>
      <ActivityIndicator size='large' />
    </View>
  }
  return (
    <View style={styles.container}>
      <MapView
        region={region}
        style={styles.mapStyle}
        onRegionChangeComplete={onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search This Area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={onButtonPress}
          />
        </View>
    </View>
  )
};

const mapStateToProps = ({job}) => {
  return {
    jobs: job.jobs
  }
}

export default connect(mapStateToProps, actions)(MapScreen);

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
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20
  }
});