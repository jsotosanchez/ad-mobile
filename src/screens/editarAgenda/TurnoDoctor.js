import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles';
import { getSemanaQueViene } from '../../helpers/calendar';
import moment from 'moment';

export default function TurnoDoctor({ id, paciente, horario, confirmado, especialidad, borrarTurno }) {
  const disabled = moment(horario).isBefore(getSemanaQueViene());

  return (
    <View style={styles.turno}>
      <Text style={styles.label}>Hora: {horario.slice(11, 16)}</Text>
      <Text style={styles.label}>Especialidad: {especialidad}</Text>
      {paciente ? (
        <>
          <Text style={styles.label}>Paciente: {paciente}</Text>
          <Text style={confirmado ? styles.confirmado : styles.label}>
            {confirmado ? 'Confirmado' : 'Sin confirmar'}
          </Text>
        </>
      ) : (
        <View style={styles.twoColumns}>
          <TouchableOpacity
            disabled={disabled}
            style={disabled ? styles.buttonAceptarDisabled : styles.buttonCancelar}
            onPress={() => borrarTurno(id, horario, getSemanaQueViene)}
          >
            <Text style={styles.buttonLogInText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
