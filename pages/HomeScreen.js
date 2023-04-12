import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';

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

/* Colors
https://colorhunt.co/palette/ecf9fffffbebffe7ccf8cba6
#ECF9FF
#FFFBEB
#FFE7CC
#F8CBA6

 */

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});