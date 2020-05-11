import { AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types'

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token')
  if (token) {
    dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token})
  } else {
    doFacebookLogin()
  }
}

async function doFacebookLogin() {
  try {
    await Facebook.initializeAsync('251572112627297');
    const {
      type,
      token,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      AsyncStorage.setItem('fb_token', token)
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    } else if (type === 'cancel') {
      dispatch({type: FACEBOOK_LOGIN_FAIL, payload: token})

    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}