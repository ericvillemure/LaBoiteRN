import React, { useState } from 'react';
import { createStore } from 'redux';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import gameReducer from './GameReducer';
import { Provider } from 'react-redux';
import HomeScreen from './pages/HomeScreen';
import CreateScreen from './pages/CreateScreen';


const store = createStore(gameReducer);
console.log(store.getState())

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Create">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Create" component={CreateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

