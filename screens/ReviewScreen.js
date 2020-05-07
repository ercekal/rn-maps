import React from 'react';
import { Text, View, Platform } from 'react-native';
import { Button,  } from 'react-native-elements'

const ReviewScreen = ({navigation, route}) => {

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

  return <Text>Count</Text>;
}

export default ReviewScreen;
