import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles';

export default function Turno({
  id,
  especialidad,
  horario,
  medico,
  confirmado,
  confirmable,
  cancelarTurno,
  confirmarTurno,
}) {
  return (
    <View style={styles.turno}>
      <Text style={styles.label}>
        {especialidad} con {medico}
      </Text>
      <Text style={styles.label}>
        Dia: {horario.slice(0, 10)} a las {horario.slice(11, 16)}
      </Text>
      <Text style={confirmado ? styles.confirmado : styles.label}>{confirmado ? 'Confirmado' : 'Sin confirmar'}</Text>
      <View style={styles.twoColumns}>
        <TouchableOpacity
          style={confirmable && !confirmado ? styles.buttonAceptar : styles.buttonAceptarDisabled}
          onPress={() => confirmarTurno(id)}
          disabled={!confirmable || confirmado}
        >
          <Text style={styles.buttonTurnoText}>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancelar} onPress={() => cancelarTurno(id, horario)}>
          <Text style={styles.buttonTurnoText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
