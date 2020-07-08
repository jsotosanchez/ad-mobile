import React, { useState, useContext } from 'react';
import { View, FlatList, Alert, Text } from 'react-native';
import MedicAppointment from './MedicAppointment';
import { fetchDelete } from '../../http/delete';
import { urlBorrarTurno } from '../../config/urls';
import { Context as SessionContext } from '../../contextComponents/SessionContext';
import { useOptions } from '../../hooks/useOptions';
import BackButton from '../../navigation/BackButton';
import { styles } from '../../../styles';

export default function AppointmentsOfADay({ route, navigation }) {
  const [appointments, setAppointments] = useState(route.params.appointments);
  const context = useContext(SessionContext);
  const options = useOptions(context);

  const deleteAppointment = (id) => {
    Alert.alert(
      'Are you sure?',
      `You can't undo this action`,
      [
        {
          text: 'Back',
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress: () => {
            fetchDelete(urlBorrarTurno(id), options);
            setAppointments((prev) => prev.filter((t) => t.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <MedicAppointment
            specialty={item.especialidad}
            id={item.id}
            hour={item.horario}
            confirmed={item.confirmado}
            patient={item.paciente}
            deleteAppointment={deleteAppointment}
          />
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
}
