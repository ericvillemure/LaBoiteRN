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
import PlayingScreen from './pages/PlayingScreen';
import ScoreScreen from './pages/ScoreScreen';

const store = createStore(gameReducer);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Create">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Début" }} />
          <Stack.Screen name="Create" component={CreateScreen} options={{ title: "Joueurs" }} />
          <Stack.Screen name="Playing" component={PlayingScreen} options={({ navigation }) => ({
            title: "Levées",
            headerRight: () =>
              <Button
                color="#FFFFFF"
                title="📈"
                onPress={() => navigation.navigate('Score')}
              />
          })} />
          <Stack.Screen name="Score" component={ScoreScreen} options={{ title: "Pointage" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

