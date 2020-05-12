import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
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
// import Ionicons from 'react-native-vector-icons/Ionicons';

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
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ tabBarVisible: false }}>
          <Tab.Screen name="welcome" component={WelcomeScreen} />
          <Tab.Screen name="auth" component={AuthScreen} />
          <Tab.Screen name="main" component={Main} />
        </Tab.Navigator>
      </NavigationContainer>
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
