import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import Turno from './Turno';
import { urlTurnosConfirmar, urlTurnosCancelar, urlTurnosDePaciente } from '../../config/urls';
import { fetchPatch } from '../../http/patch';
import { styles } from '../../../styles';
import moment from 'moment';
import { useGet } from '../../hooks/useFetch';

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

export default function Turnos({}) {
  const [refresh, setRefresh] = useState(0);
  const { data: turnos, status } = useGet(urlTurnosDePaciente(110), refresh);
  // const { data: turnos, status } = useGet('https://pokeapi.co/api/v2/pokemon/ditto', refresh);

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
            onPress: () => fetchCancelarTurno(id, onRefresh),
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
            onPress: () => fetchCancelarTurno(id, onRefresh),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const confirmarTurno = (id) => {
    fetchConfirmarTurno(id, onRefresh);
  };

  const onRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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

function fetchConfirmarTurno(id, onRefresh) {
  fetchPatch(urlTurnosConfirmar(id))
    .then((res) => {
      Alert.alert('Se ha confirmado su turno');
      onRefresh();
    })
    .catch((e) => {
      Alert.alert('ERROR!', 'No se pudo procesar el pedido');
      console.log(e);
    });
}

function fetchCancelarTurno(id, onRefresh) {
  return fetchPatch(urlTurnosCancelar(id))
    .then((res) => {
      Alert.alert('Se ha cancelado su turno');
      onRefresh();
    })
    .catch((e) => {
      Alert.alert('ERROR!', 'No se pudo procesar el request');
      console.log(e);
    });
}
