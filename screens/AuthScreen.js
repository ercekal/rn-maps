import React, {useEffect} from 'react';
import { Text, View } from 'react-native';
import {connect} from 'react-redux'
import {facebookLogin} from '../actions/authActions'

const AuthScreen = ({onFacebookLogin}) => {
    useEffect(async () => {
      console.log('calling: ');
      return await onFacebookLogin()
    })

    return (
      <View>
          <Text>AuthScreen</Text>
      </View>
)};

const mapDispatchToProps = dispatch => {
  return {
    onFacebookLogin: () => dispatch(facebookLogin())
  }
}

export default connect(null, mapDispatchToProps)(AuthScreen);
