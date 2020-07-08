import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useLogIn } from '../hooks/useLogIn';
import { styles } from '../../styles';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logIn = useLogIn();

  const submit = () => {
    logIn(username, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HEALTHY</Text>
      <View style={styles.logInForm}>
        <Text style={styles.label}>Username:</Text>
        <TextInput style={styles.textInput} onChangeText={setUsername} value={username} placeholder="mike" />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="*******"
          secureTextEntry
        />
        <View>
          <TouchableOpacity style={styles.buttonAzulOscuro} onPress={submit}>
            <Text style={styles.buttonLogInText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
