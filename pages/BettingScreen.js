import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TextInput, Button, Text, View, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditableList from '../components/EditableList';
import { confirmBets, endHand, setBet, setBusted } from '../GameActions';
import { suits, getDistanceFromMiddle, getMaxNumberOfCardsPerHand, dealer, box, handStates } from '../utils';
import { bettingStyles } from '../styles';

function BettingScreen({ users, hand, currentHandIndex, confirmBets, endHand, setBet, setBusted }) {

  const inputElements = useRef(new Array())

  function confirmBetsWithValidation() {
    console.log(JSON.stringify(hand.usersValues))
    if (hand.usersValues.some(userValue => isNaN(userValue.bet))) {
      Alert.alert("Erreur", "Tous les joueurs doivent miser (entrer 0 si aucune levée)");
    } else {
      confirmBets();
    }
  }

  function submitBet(inputIndex) {
    if (hand.usersValues.every(userValue => !isNaN(userValue.bet))) {
      //Last one from the list
      Alert.alert(
        'Prêt',
        'Confirmer les levées?',
        [
          {
            text: 'Annuler',
            // onPress: () => inputElements.current[firstIndexOfEmptyBet].focus(),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => confirmBetsWithValidation() },
        ]
      );
    } else {
      console.log("else", (inputIndex + 1) % users.length, inputElements.current.length)
      inputElements.current[(inputIndex + 1) % users.length].focus()
    }
  }

  useEffect(() => {
    inputElements.current[0].focus()
  }, users)

  const suitIndex = currentHandIndex % 5;
  const dealerIndex = currentHandIndex % users.length;

  const betOrderUserIndices = users.map((item, index) => (dealerIndex + index + 1) % users.length)

  const maxNumberOfCardsPerHand = getMaxNumberOfCardsPerHand(users.length)
  const numberOfCards = getDistanceFromMiddle(2 * maxNumberOfCardsPerHand, currentHandIndex);
  return (
    <View style={bettingStyles.container}>
      <View style={bettingStyles.topContainer}>
        <View style={bettingStyles.topContainerSuit}>
          <Text style={bettingStyles.suitText} color={suits[suitIndex].color}>{suits[suitIndex].symbol}</Text>
        </View>
        <View style={bettingStyles.topContainerInfo}>
          <Text style={bettingStyles.topContainerInfoText}>{numberOfCards} cartes</Text>
        </View>
      </View>
      <ScrollView style={bettingStyles.betsView}>
        {betOrderUserIndices.map((userIndex, index) =>
          <View style={bettingStyles.betView} key={users[userIndex]}>
            <View style={bettingStyles.betDealerIconView}>
              <Text style={bettingStyles.betDealerIconText}>{userIndex === dealerIndex && dealer}</Text>
            </View>
            <View style={bettingStyles.betPlayerNameView}>
              <Text style={bettingStyles.betPlayerNameText}>{users[userIndex]}</Text>
            </View>
            {hand.state === handStates.Betting &&
              <View style={bettingStyles.betInputView}>
                <TextInput ref={(element) => inputElements.current.push(element)}

                  style={bettingStyles.betInput}
                  autoFocus={index === 0}
                  keyboardType='numeric'
                  returnKeyType={index === users.length - 1 ? "done" : "next"}
                  onChangeText={text => setBet(userIndex, isNaN(text) ? undefined : parseInt(text))}
                  value={hand.usersValues[userIndex].bet?.toString()}
                  onSubmitEditing={() => submitBet(index)} />
              </View>}
            {hand.state === handStates.Playing &&
              <View style={bettingStyles.betBetTextView}>
                <Text
                  style={bettingStyles.betBetText} value={hand.bet}>
                  {hand.usersValues[userIndex].bet}
                </Text>
              </View>}
            {hand.state === handStates.Playing &&
              <View style={bettingStyles.betBetCheckboxView}>
                <Text style={bettingStyles.betBetCheckboxIcon} >{box}</Text>
                <Checkbox
                  value={hand.usersValues[userIndex].busted}
                  onValueChange={(newValue) => setBusted(userIndex, newValue)}
                />
              </View>}
            {/* <ScrollView  style={bettingStyles.betButtonsView} horizontal showsHorizontalScrollIndicator>
              {Array.from(Array(numberOfCards + 1).keys()).map(number =>
                <View key={number} style={bettingStyles.betButtonView}>
                  <Button
                    title={number.toString()}
                    style={bettingStyles.betButton}
                    key={number}
                  />
                </View>)}
            </ScrollView> */}

          </View>)
        }
      </ScrollView >
      <View style={bettingStyles.bottomContainer}>
        {hand.state === handStates.Betting &&
          <Button
            title="Confirmer levées"
            onPress={() => confirmBetsWithValidation()}
          />
        }
        {hand.state === handStates.Playing &&
          <Button
            title="Terminer manche"
            onPress={() => endHand()}
          />
        }
      </View>
    </View >
  );
}

const mapStateToProps = (state) => {
  const { users, hands, currentHandIndex } = state.game;
  return { users, hand: hands[currentHandIndex], currentHandIndex }
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    confirmBets,
    endHand,
    setBet,
    setBusted
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(BettingScreen);

