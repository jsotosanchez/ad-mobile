import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles';

export default function Notificacion({ id, data, irACartillaMedica, marcarLeida }) {
  return (
    <View style={styles.notificacion}>
      <Text>{data}</Text>
      <View style={styles.twoColumns}>
        <TouchableOpacity style={styles.buttonAceptar} onPress={() => marcarLeida(id)}>
          <Text style={styles.buttonTurnoText}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAzulOscuro} onPress={irACartillaMedica}>
          <Text style={styles.buttonTurnoText}>Buscar Turno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
