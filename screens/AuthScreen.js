import React, {useEffect} from 'react';
import { View } from 'react-native';
import {connect} from 'react-redux'
import * as actions from '../actions'

const AuthScreen = ({facebookLogin, token, navigation}) => {

  useEffect(() => {
    facebookLogin()
    onAuthComplete()
  }, [])

  useEffect(() => {
    onAuthComplete()
  }, [token])

  function onAuthComplete() {
    if (token) {
      return navigation.navigate('main')
    }
  }
  return (
    <View />
  )
};

const mapStateToProps = ({auth}) => {
  return {
    token: auth.token
  }
}

export default connect(mapStateToProps, actions)(AuthScreen);
