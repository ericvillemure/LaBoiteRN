import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TextInput, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditableList from '../components/EditableList';
import { setUserList, startGame } from '../GameActions';
import { suits, getDistanceFromMiddle, getMaxNumberOfCardsPerHand } from '../utils';
import { bettingStyles } from '../styles';

function BettingScreen({ users, route, navigation }) {

  const { currentHandIndex } = route.params;

  const suitIndex = currentHandIndex % 5;
  const dealerIndex = currentHandIndex % users.length;

  const betOrderUserIndices = users.map((item, index) => (dealerIndex + index + 1) % users.length)

  const maxNumberOfCardsPerHand = getMaxNumberOfCardsPerHand(users.length)
  const numberOfCards = getDistanceFromMiddle(2 * maxNumberOfCardsPerHand, currentHandIndex);


  return (
    <View style={bettingStyles.container}>
      <Text>Brasseur {users[dealerIndex]} tour {currentHandIndex + 1}/{2 * maxNumberOfCardsPerHand}</Text>
      <Text>Cartes {numberOfCards}</Text>
      <Text style={bettingStyles.suitContainer} color={suits[suitIndex].color}>{suits[suitIndex].symbol}</Text>
      <ScrollView>
        {betOrderUserIndices.map(index =>
          <View key={users[index]}>
            <Text>Mise de {users[index]}</Text>
            <TextInput keyboardType='numeric' />
          </View>)}
      </ScrollView>
      <Button
        title="Les jeux sont faits"
        onPress={() => {
          navigation.navigate('PlayingHand', { currentHandIndex })
        }}
      />

      <Button
        title="Prochaine manche"
        onPress={() => {
          navigation.navigate('Betting', { currentHandIndex: currentHandIndex + 1 })
        }}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  const { users, score } = state.game;
  return { users, score }
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUserList,
    startGame
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(BettingScreen);

