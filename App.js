import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import {Provider} from 'react-redux'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import MapScreen from './screens/MapScreen'
import DeckScreen from './screens/DeckScreen'
import ReviewScreen from './screens/ReviewScreen'
import SettingsScreen from './screens/SettingsScreen'
import configureStore from './store';

const {store, persistor} = configureStore();
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState({})
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  useEffect(() => {
    registerForPushNotificationsAsync()
    _notificationSubscription = Notifications.addListener(_handleNotification);
  }, [])
  const _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    setNotification({ notification: notification });
  };

  const registerForPushNotificationsAsync = async () => {

    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      setExpoPushToken({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  function ReviewStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="review"
          component={ReviewScreen}
          options={{
            title: 'Review Jobs',
          }}/>
        <Stack.Screen name="settings" component={SettingsScreen} />
      </Stack.Navigator>
    );
  }

  const Main = () => {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Map') {
                iconName = 'my-location'
              } else if (route.name === 'Jobs') {
                iconName = 'list'
              } else if (route.name === 'Favorites') {
                iconName = 'favorite'
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Jobs" component={DeckScreen} />
          <Tab.Screen name="Favorites" component={ReviewStack} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ tabBarVisible: false }}>
            <Tab.Screen name="welcome" component={WelcomeScreen} />
            <Tab.Screen name="auth" component={AuthScreen} />
            <Tab.Screen name="main" component={Main} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

App.navigationOptions = {
  tabBarVisible: false
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
