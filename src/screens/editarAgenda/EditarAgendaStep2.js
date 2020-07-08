import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, RefreshControl, ScrollView } from 'react-native';
import { useGet } from '../../hooks/useFetch';
import { useOptions } from '../../hooks/useOptions';
import { fetchDelete } from '../../http/delete';
import { urlTurnosDeMedico } from '../../config/urls';
import { styles } from '../../../styles';
import { urlBorrarTurnosPorDia } from '../../config/urls';
import { Context as SessionContext } from '../../contextComponents/SessionContext';
import BackButton from '../../navigation/BackButton';
import { getSemanaQueViene } from '../../helpers/calendar';
import moment from 'moment';

export default function EditarAgendaStep2({ route, navigation }) {
  const { fecha } = route.params;
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const options = useOptions(context);
  const [refresh, setRefresh] = useState(0);
  const { data: turnos, status } = useGet(urlTurnosDeMedico(userId, fecha), refresh, options);
  const handleVerTurnos = () => {
    navigation.navigate('AppointmentsOfADay', { fecha, turnos });
  };

  const fechaEsModificable = moment(fecha).isAfter(getSemanaQueViene());

  const handleEliminar = () => {
    if (turnos.filter((t) => t.paciente).length === 0) {
      Alert.alert('Estas seguro?', 'Quieres eliminar todos los turnos del dia?', [
        {
          text: 'Regresar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Acepto',
          onPress: () =>
            fetchDelete(urlBorrarTurnosPorDia(userId, fecha), options)
              .then(() => {
                Alert.alert('Se han eliminado todos los turnos exitosamente');
                handleOnRefresh();
              })
              .catch(() => {
                {
                  Alert.alert('Se han eliminado todos los turnos exitosamente');
                  handleOnRefresh();
                }
              }),
        },
      ]);
    } else {
      Alert.alert('No se puede eliminar porque ya tienes turnos reservados');
    }
  };

  const handleOnRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.h1}>Mi Agenda</Text>
      </View>
      <ScrollView
        style={styles.centered}
        refreshControl={
          <RefreshControl refreshing={status === 'LOADING'} onRefresh={handleOnRefresh} title="Cargando..." />
        }
      >
        <Text style={styles.labelCentered}>{fecha.slice(0, 10)}</Text>
        <TouchableOpacity style={{ ...styles.buttonBlanco, marginTop: 20 }} onPress={() => handleVerTurnos()}>
          <Text style={styles.buttonBlancoText}>Ver turnos del dia</Text>
        </TouchableOpacity>
        {fechaEsModificable && (
          <TouchableOpacity style={styles.buttonBlanco} onPress={() => handleEliminar()}>
            <Text style={styles.buttonBlancoText}>Eliminar dia</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
