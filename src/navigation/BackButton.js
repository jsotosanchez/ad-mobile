import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';

export default function BackButton({ navigation }) {
  return (
    <View style={{ marginRight: 50, marginLeft: 10 }}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text style={styles.backButton}> Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
