import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';
import { Context as SessionContext } from '../contextComponents/SessionContext';
import BurgerMenu from '../navigation/BurgerMenu';

export default function SignOut({ navigation }) {
  const context = useContext(SessionContext);
  const unAuthorize = context.unAuthorize;
  const isMedic = context.isMedico();

  const submit = () => {
    isMedic ? navigation.navigate('Mi Agenda') : navigation.navigate('Citas Medicas');
    unAuthorize();
  };

  return (
    <>
      <View style={styles.header}>
        <BurgerMenu navigation={navigation} />
      </View>
      <View style={styles.logOut}>
        <Text style={styles.labelCentered}>Are you sure?</Text>
        <TouchableOpacity style={styles.buttonLogOut} onPress={submit}>
          <Text style={styles.buttonLogInText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
