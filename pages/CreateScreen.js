import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Text, View } from 'react-native';
import uuid from 'react-native-uuid';
import EditableList from '../components/EditableList';
import { setUserList, startGame } from '../GameActions';
import { createStyles } from '../styles';

function CreateScreen({ users, navigation, setUserList, startGame }) {
  const listMinLength = 2;
  const listMaxLength = 8;
  return (
    <View style={createStyles.container}>
      <Text>Ajoutez des joueurs (entre 2 et 8)</Text>
      <EditableList
        placeholder={users.length === listMaxLength ? `Max ${listMaxLength} joueurs` : "Entrez un nom"}
        onListChange={newList => setUserList(newList.map(user => ({ name: user, id: uuid.v4() })))}
        list={users.map(user => user.name)}
        preventAdd={users.length === listMaxLength} />
      {users.length >= listMinLength && <Button
        title="Démarrer"
        onPress={() => {
          startGame()
          navigation.navigate('Playing')
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen);


