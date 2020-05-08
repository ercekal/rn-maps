import {isNull} from 'lodash'
import React, {useState} from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

const WelcomeScreen = ({navigation}) => {
  const [fbToken, setFbToken] = useState(AsyncStorage.getItem('fb_token'))
  fbToken ? navigation.navigate('main') : setFbToken(false)
  const onSlidesComplete = () => {
    navigation.navigate('auth')
  }

  if (isNull(fbToken)) {
    return <AppLoading />
  } else {
    return (
      <View style={{flex: 1}}>
        <Slides data={SLIDE_DATA} onComplete={onSlidesComplete} />
      </View>
    )
  }
}

export default WelcomeScreen;
