import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Button } from 'react-native-elements'
import * as actions from '../actions'

const SettingsScreen = ({resetJobs}) => (
  <View>
    <Button
      title="Reset jobs!"
      backgroundColor="#03A9F4"
      onPress={() => resetJobs()}
    />
  </View>
);

export default connect(null, actions)(SettingsScreen);
