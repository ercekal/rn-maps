import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Provider} from 'react-redux'
import AuthScreen from './screens/AuthScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import MapScreen from './screens/MapScreen'
import DeckScreen from './screens/DeckScreen'
import ReviewScreen from './screens/ReviewScreen'
import SettingsScreen from './screens/SettingsScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store'

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

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
        <Tab.Navigator>
          <Tab.Screen name="map" component={MapScreen} />
          <Tab.Screen name="deck" component={DeckScreen} />
          <Tab.Screen name="review" component={ReviewStack} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="welcome" component={WelcomeScreen} />
          <Tab.Screen name="auth" component={AuthScreen} />
          <Tab.Screen name="main" component={Main} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
