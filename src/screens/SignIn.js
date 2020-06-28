import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useLogIn } from '../hooks/useLogIn';
import { styles } from '../../styles';

export default function SignIn() {
  const [documento, setDocumento] = useState('');
  const [pass, setPass] = useState('');

  const logIn = useLogIn();

  const submit = () => {
    logIn(documento, pass);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HEALTHY</Text>
      <View style={styles.logInForm}>
        <Text style={styles.label}>Documento:</Text>
        <TextInput style={styles.textInput} onChangeText={setDocumento} value={documento} placeholder="4530..." />
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput style={styles.textInput} onChangeText={setPass} value={pass} placeholder="*******" secureTextEntry />
        <View>
          <TouchableOpacity style={styles.buttonAzulOscuro} onPress={submit}>
            <Text style={styles.buttonLogInText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
