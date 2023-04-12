import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditableList from '../components/EditableList';
import { setUserList, startGame } from '../GameActions';
import { suits } from '../utils';
import { playingHandStyles } from '../styles';

function PlayingHandScreen({ users, route, navigation, setUserList, startGame }) {
  const listMinLength = 2;
  const listMaxLength = 8;
  const { currentHandIndex } = route.params;

  const suitIndex = currentHandIndex % 5;
  const userIndex = currentHandIndex % users.length;
  return (
    <View style={playingHandStyles.container}>
      <Text color={suits[suitIndex].color}>{suits[suitIndex].symbol}</Text>
      <Text>Brasseur {users[userIndex]}</Text>
      {users.length >= listMinLength && <Button
        title="Démarrer"
        onPress={() => {
          startGame()
          navigation.navigate('PlayingHand')
        }}
      />}

    </View>
  );
}

const mapStateToProps = (state) => {
  const { game } = state
  return { users: game.users }
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUserList,
    startGame
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PlayingHandScreen);



