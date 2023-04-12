import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import { homeStyles } from '../styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={homeStyles.container}>
      <Text>Créez une nouvelle partie pour commencer</Text>
      <Button
        title="Créer nouvelle partie"
        onPress={() => navigation.navigate('Create')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

