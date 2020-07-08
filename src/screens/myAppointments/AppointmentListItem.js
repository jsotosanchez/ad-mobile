import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles';

export default function AppointmentListItem({
  id,
  specialty,
  time,
  medic,
  confirmed,
  confirmable,
  cancelAppointment,
  confirmAppointment,
}) {
  return (
    <View style={styles.turno}>
      <Text style={styles.label}>
        {specialty} con {medic}
      </Text>
      <Text style={styles.label}>
        Dia: {time.slice(0, 10)} a las {time.slice(11, 16)}
      </Text>
      <Text style={confirmed ? styles.confirmado : styles.label}>{confirmed ? 'Confirmado' : 'Sin confirmar'}</Text>
      <View style={styles.twoColumns}>
        <TouchableOpacity
          style={confirmable && !confirmed ? styles.buttonAceptar : styles.buttonAceptarDisabled}
          onPress={() => confirmAppointment(id)}
          disabled={!confirmable || confirmed}
        >
          <Text style={styles.buttonTurnoText}>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancelar} onPress={() => cancelAppointment(id, time)}>
          <Text style={styles.buttonTurnoText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
