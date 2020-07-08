import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import AppointmentListItem from './AppointmentListItem';
import { urlTurnosConfirmar, urlTurnosCancelar, urlTurnosDePaciente } from '../../config/urls';
import { fetchPatch } from '../../http/patch';
import { styles } from '../../../styles';
import moment from 'moment';
import { useGet } from '../../hooks/useFetch';
import { useOptions } from '../../hooks/useOptions';
import { Context as SessionContext } from '../../contextComponents/SessionContext';
import BurgerMenu from '../../navigation/BurgerMenu';

const calculateHoursBetweenDates = (fechaInicio, fechaFin) => {
  const duration = moment.duration(moment(fechaFin).diff(moment(fechaInicio)));
  const hours = duration.asHours();
  return Math.floor(Math.abs(hours));
};

export default function MyAppointments({ navigation }) {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const options = useOptions(context);
  const [refresh, setRefresh] = useState(0);
  const { data: appointments, status: fetchStatus } = useGet(urlTurnosDePaciente(userId), refresh, options);

  const todaysDate = new Date();

  const cancelAppointment = (id, fecha) => {
    if (calculateHoursBetweenDates(fecha, todaysDate) <= 12) {
      Alert.alert(
        'Are you sure?',
        `If you cancel this appointment you'll be charged a fee due to the time that you're cancelling it`,
        [
          {
            text: 'Back',
            style: 'cancel',
          },
          {
            text: 'Accept',
            onPress: () => fetchCancelAppointment(id, options, onRefresh),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Are you sure? ',
        'This action is un reversible',
        [
          {
            text: 'Back',
            style: 'cancel',
          },
          {
            text: 'Accept',
            onPress: () => fetchCancelAppointment(id, options, onRefresh),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const confirmAppointment = (id) => {
    fetchConfirmAppointment(id, options, onRefresh);
  };

  const onRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles.h1}>My appointments</Text>
      </View>
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <AppointmentListItem
            id={item.id}
            specialty={item.especialidad}
            time={item.horario}
            medic={item.medico}
            confirmed={item.confirmado}
            cancelAppointment={cancelAppointment}
            confirmAppointment={confirmAppointment}
            confirmable={calculateHoursBetweenDates(item.horario, todaysDate) <= 12}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        refreshing={fetchStatus === 'LOADING'}
        onRefresh={() => {
          onRefresh();
        }}
      />
    </View>
  );
}

function fetchConfirmAppointment(id, options, onRefresh) {
  fetchPatch(urlTurnosConfirmar(id), options)
    .then((res) => {
      Alert.alert('You have confirmed the appointment');
      onRefresh();
    })
    .catch((e) => {
      Alert.alert(`There's been an error please try later`);
    });
}

function fetchCancelAppointment(id, options, onRefresh) {
  return fetchPatch(urlTurnosCancelar(id), options)
    .then((res) => {
      Alert.alert('You have confirmed the appointment');
      onRefresh();
    })
    .catch((e) => {
      Alert.alert(`There's been an error please try later`);
    });
}
