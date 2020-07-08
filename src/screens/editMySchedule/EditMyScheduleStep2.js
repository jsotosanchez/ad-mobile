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

export default function EditMyScheduleStep2({ route, navigation }) {
  const { selectedDate } = route.params;
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const options = useOptions(context);
  const [refresh, setRefresh] = useState(0);
  const { data: appointments, status: fetchStatus } = useGet(urlTurnosDeMedico(userId, selectedDate), refresh, options);

  const handleSeeAppointments = () => {
    navigation.navigate('AppointmentsOfADay', { selectedDate, appointments });
  };

  const dateIsEditable = moment(selectedDate).isAfter(getSemanaQueViene());
  const havePatients = appointments.filter((t) => t.paciente).length > 0;
  const handleDeleteAll = () => {
    if (havePatients) {
      Alert.alert(`You can't delete the whole day because you already have patients`);
    } else {
      Alert.alert('Are you sure?', 'If you delete the appointments you can not undo this action', [
        {
          text: 'Back',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress: () =>
            fetchDelete(urlBorrarTurnosPorDia(userId, selectedDate), options)
              .then(() => {
                Alert.alert('You have deleted all your appointments from this day');
                handleOnRefresh();
              })
              .catch(() => {
                {
                  // fix api is returning error on succeed ??
                  Alert.alert('You have deleted all your appointments from this day');
                  handleOnRefresh();
                }
              }),
        },
      ]);
    }
  };

  const handleOnRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.centered}
        refreshControl={
          <RefreshControl refreshing={fetchStatus === 'LOADING'} onRefresh={handleOnRefresh} title="Cargando..." />
        }
      >
        <Text style={styles.labelCentered}>{selectedDate.slice(0, 10)}</Text>
        <TouchableOpacity style={{ ...styles.buttonBlanco, marginTop: 20 }} onPress={() => handleSeeAppointments()}>
          <Text style={styles.buttonBlancoText}>See all appointments</Text>
        </TouchableOpacity>
        {dateIsEditable && (
          <TouchableOpacity style={styles.buttonBlanco} onPress={() => handleDeleteAll()}>
            <Text style={styles.buttonBlancoText}>Delete all appointments</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
