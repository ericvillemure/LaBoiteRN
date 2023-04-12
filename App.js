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
import BettingScreen from './pages/BettingScreen';
import PlayingHandScreen from './pages/PlayingHandScreen';


const store = createStore(gameReducer);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Create">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Create" component={CreateScreen} />
          <Stack.Screen name="Betting" component={BettingScreen} />
          <Stack.Screen name="PlayingHand" component={PlayingHandScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

