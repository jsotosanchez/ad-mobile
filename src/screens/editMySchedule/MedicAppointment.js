import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles';
import { getNextWeek } from '../../helpers/calendar';
import moment from 'moment';

export default function MedicAppointment({ id, patient, hour, confirmed, specialty, deleteAppointment }) {
  const disabled = moment(hour).isBefore(getNextWeek());
  return (
    <View style={styles.turno}>
      <Text style={styles.label}>Time: {hour.slice(11, 16)}</Text>
      <Text style={styles.label}>Specialty: {specialty}</Text>
      {patient ? (
        <>
          <Text style={styles.label}>Patient: {patient}</Text>
          <Text style={confirmed ? styles.confirmado : styles.label}>{confirmed ? 'Confirmed' : 'Not confirmed'}</Text>
        </>
      ) : (
        <View style={styles.twoColumns}>
          <TouchableOpacity
            disabled={disabled}
            style={disabled ? styles.buttonAceptarDisabled : styles.buttonCancelar}
            onPress={() => deleteAppointment(id)}
          >
            <Text style={styles.buttonLogInText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
