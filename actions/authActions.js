import {AsyncStorage} from 'react-native'
import * as Facebook from 'expo-facebook';
import {
  FACEBOOK_LOGIN_SUCCESS
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
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync('251572112627297', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      AsyncStorage.setItem('fb_token', token)
      dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token})
      // fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('data: ', data);
      //   })
      //   .catch(e => console.log(e))
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}