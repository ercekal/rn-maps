import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux'

const INITIAL_REGION = {
  longitude: -122,
  latitude: 37,
  longitudeDelta: 0.04,
  latitudeDelta: 0.09
}
const MapScreen = ({jobs}) => {
  console.log('jobs: ', jobs);
  const [region, setRegion] = useState(INITIAL_REGION)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => setMapLoaded(true), [])

  const onRegionChangeComplete = (region) => {
    setRegion(region)
  }
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
        onRegionChangeComplete={onRegionChangeComplete}
        />
    </View>
  )
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onFetchJobs: () => dispatch(fetchJobs())
//   }
// }
const mapStateToProps = ({job}) => {
  console.log('job: ', job);
  return {
    jobs: job.jobs

  }
}

export default connect(mapStateToProps)(MapScreen);

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