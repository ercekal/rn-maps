import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements'
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

const ReviewScreen = ({navigation, route, likedJobs}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { flex: 1, textAlign: 'center', color: 'black', fontSize: 20, alignSelf: 'center' , },
      headerTintColor: 'white',
      headerStyle: {
          backgroundColor: 'white',
      },
      headerTitleAlign: 'center',
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('settings')}
          type="clear"
          title="Settings"
        />
      ),
      // style: {
      //   marginTop: Platform.OS === 'android' ? 24 : 0
      // }
    });
  }, [navigation]);

  function renderLikedJobs() {
    return likedJobs.map(job => {
      const {
        company, formattedRelativeTime, url,
        longitude, latitude, jobtitle, jobkey
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };

      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }


  return <ScrollView>{renderLikedJobs()}</ScrollView>;
}

const styles = {
  italics: {
    fontStyle: 'italic'
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

const mapStateToProps = state => {
  console.log('likedJobs: ', state);
  return { likedJobs: state.likedJobs };
}


export default connect(mapStateToProps)(ReviewScreen);
