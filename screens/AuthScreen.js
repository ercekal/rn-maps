import React, {useEffect} from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import {connect} from 'react-redux'
import {facebookLogin} from '../actions/authActions'

const AuthScreen = ({onFacebookLogin, token, navigation}) => {

  useEffect(() => {
    onFacebookLogin()
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

const mapDispatchToProps = dispatch => {
  return {
    onFacebookLogin: () => dispatch(facebookLogin())
  }
}

const mapStateToProps = ({auth}) => {
  return {
    token: auth.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
