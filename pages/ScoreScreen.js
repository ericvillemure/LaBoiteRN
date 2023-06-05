import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditableList from '../components/EditableList';
import { setUserList, startGame } from '../GameActions';
import { suits, getDistanceFromMiddle, getMaxNumberOfCardsPerHand, dealer, box, handStates } from '../utils';
import { summaryStyles } from '../styles';

function ScoreScreen({ users, hands }) {

  return (
    <View style={summaryStyles.container}>
      {users && users.map((user, userIndex) =>
        <View key={user.id} style={summaryStyles.userRow}>
          <Text style={summaryStyles.userNameText}>{user.name}</Text>
          {hands && hands.map(hand =>
            <Text key={hand.id}>{hand.usersValues[userIndex].bet}{hand.usersValues[userIndex].busted && box}</Text>
          )}
        </View>
      )}

    </View>
  );
}

const mapStateToProps = (state) => {
  const { users, hands } = state.game;
  return { users, hands }
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUserList,
    startGame
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ScoreScreen);



