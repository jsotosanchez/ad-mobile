import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import Turno from './Turno';
import { urlTurnosConfirmar, urlTurnosCancelar, urlTurnosDePaciente } from '../../config/urls';
import { fetchPatch } from '../../http/patch';
import { styles } from '../../../styles';
import moment from 'moment';
import { useGet } from '../../hooks/useFetch';
import { useOptions } from '../../hooks/useOptions';
import { Context as SessionContext } from '../../contextComponents/SessionContext';
import BurgerMenu from '../../navigation/BurgerMenu';

//metodos auxiliaries
const calcularHorasEntreFechas = (fechaFin, fechaInicio) => {
  const diferenciaDeHoras = horasEntreFechas(fechaFin, fechaInicio);
  return diferenciaDeHoras;
};

const horasEntreFechas = (fechaInicio, fechaFin) => {
  const duration = moment.duration(moment(fechaFin).diff(moment(fechaInicio)));
  const hours = duration.asHours();
  return Math.floor(Math.abs(hours));
};

export default function Turnos({ navigation }) {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const options = useOptions(context);
  const [refresh, setRefresh] = useState(0);
  const { data: turnos, status } = useGet(urlTurnosDePaciente(userId), refresh, options);

  const fechaHoy = new Date();

  /**
   *
   * @param {number} id
   * @param {Date} fecha
   */
  const cancelarTurno = (id, fecha) => {
    const diferenciaDeHoras = calcularHorasEntreFechas(fecha, fechaHoy);
    if (diferenciaDeHoras <= 12) {
      Alert.alert(
        'Está seguro?',
        'Si cancela el turno se generara un cargo en su cuenta por cancelar antes de 12 horas',
        [
          {
            text: 'Regresar',
            onPress: () => console.log('Deteniendo cancelar turno'),
            style: 'cancel',
          },
          {
            text: 'Acepto',
            onPress: () => fetchCancelarTurno(id, options, onRefresh),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Cancelando Turno',
        'Está seguro de cancelar su turno?',
        [
          {
            text: 'Regresar',
            onPress: () => console.log('Deteniendo cancelar turno'),
            style: 'cancel',
          },
          {
            text: 'Acepto',
            onPress: () => fetchCancelarTurno(id, options, onRefresh),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const confirmarTurno = (id) => {
    fetchConfirmarTurno(id, options, onRefresh);
  };

  const onRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles.h1}>Mis turnos</Text>
      </View>
      <FlatList
        data={turnos}
        renderItem={({ item }) => (
          <Turno
            id={item.id}
            especialidad={item.especialidad}
            horario={item.horario}
            medico={item.medico}
            confirmado={item.confirmado}
            cancelarTurno={cancelarTurno}
            confirmarTurno={confirmarTurno}
            confirmable={calcularHorasEntreFechas(item.horario, fechaHoy) <= 12}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        refreshing={status === 'LOADING'}
        onRefresh={() => {
          onRefresh();
        }}
      />
    </View>
  );
}

function fetchConfirmarTurno(id, options, onRefresh) {
  fetchPatch(urlTurnosConfirmar(id), options)
    .then((res) => {
      Alert.alert('Se ha confirmado su turno');
      onRefresh();
    })
    .catch((e) => {
      Alert.alert('ERROR!', 'No se pudo procesar el pedido');
      console.log(e);
    });
}

function fetchCancelarTurno(id, options, onRefresh) {
  return fetchPatch(urlTurnosCancelar(id), options)
    .then((res) => {
      Alert.alert('Se ha cancelado su turno');
      onRefresh();
    })
    .catch((e) => {
      Alert.alert('ERROR!', 'No se pudo procesar el request');
      console.log(e);
    });
}
