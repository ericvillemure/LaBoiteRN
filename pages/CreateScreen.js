import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditableList from '../components/EditableList';
import { setUserList } from '../GameActions';

function CreateScreen(props) {
  const listMaxLength = 8;
  return (
    <View style={createStyles.container}>
      <Text>Ajoutez des joueurs (entre 2 et 8)</Text>
      <EditableList
        placeholder={props.users.length === listMaxLength ? `Max ${listMaxLength} joueurs` : "Entrez un nom"}
        onListChange={newList => props.setUserList(newList)}
        list={props.users}
        preventAdd={props.users.length === listMaxLength} />
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
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen);


const createStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF9FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 40
  },
  data: {
    fontSize: 20
  }
});
