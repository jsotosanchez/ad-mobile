import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useGet } from '../../hooks/useFetch';
import { useOptions } from '../../hooks/useOptions';
import { fetchDelete } from '../../http/delete';
import { urlTurnosDeMedico } from '../../config/urls';
import { styles } from '../../../styles';
import { urlBorrarTurnosPorDia } from '../../config/urls';
import { Context as SessionContext } from '../../contextComponents/SessionContext';
import BackButton from '../../BackButton';

export default function EditarAgendaStep2({ route, navigation }) {
  const { fecha } = route.params;
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const options = useOptions(context);
  const { data: turnos } = useGet(urlTurnosDeMedico(userId, fecha), null, options);
  const handleVerTurnos = () => {
    navigation.navigate('TurnosDelDia', { fecha, turnos });
  };

  const handleEliminar = () => {
    if (turnos.filter((t) => t.paciente).length === 0) {
      Alert.alert('Estas seguro?', 'Quieres eliminar todos los turnos del dia?', [
        {
          text: 'Regresar',
          onPress: () => console.log('Deteniendo cancelar turno'),
          style: 'cancel',
        },
        {
          text: 'Acepto',
          onPress: () =>
            fetchDelete(urlBorrarTurnosPorDia(userId, fecha), options)
              .then(() => Alert.alert('Se han eliminado todos los turnos exitosamente'))
              .catch(() => Alert.alert('Ocurrió un error, intenta mas tarde')),
        },
      ]);
    } else {
      Alert.alert('No se puede eliminar porque ya tienes turnos reservados');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.h1}>Mi Agenda</Text>
      </View>
      <View style={styles.centered}>
        <Text style={styles.labelCentered}>{fecha.slice(0, 10)}</Text>
        <TouchableOpacity style={{ ...styles.buttonBlanco, marginTop: 20 }} onPress={() => handleVerTurnos()}>
          <Text style={styles.buttonBlancoText}>Ver turnos del dia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBlanco} onPress={() => handleEliminar()}>
          <Text style={styles.buttonBlancoText}>Eliminar dia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
