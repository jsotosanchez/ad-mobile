import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';
import { Context as SessionContext } from '../contextComponents/SessionContext';
import BurgerMenu from '../navigation/BurgerMenu';

export default function SignOut({ navigation }) {
  const context = useContext(SessionContext);
  const unAuthorize = context.unAuthorize;

  const submit = () => {
    unAuthorize();
  };

  return (
    <>
      <View style={styles.header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles.h1}>Cerrar Sesión</Text>
      </View>
      <View style={styles.logOut}>
        <Text style={styles.labelCentered}>Estas seguro que quieres salir?</Text>
        <TouchableOpacity style={styles.buttonLogOut} onPress={submit}>
          <Text style={styles.buttonLogInText}>Salir</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
