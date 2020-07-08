import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles';

export default function NotificationListItem({ id, data, navigateToScheduleAppointment, markAsRead }) {
  return (
    <View style={styles.notificacion}>
      <Text>{data}</Text>
      <View style={styles.twoColumns}>
        <TouchableOpacity style={styles.buttonAceptar} onPress={() => markAsRead(id)}>
          <Text style={styles.buttonTurnoText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAzulOscuro} onPress={navigateToScheduleAppointment}>
          <Text style={styles.buttonTurnoText}>Schedule Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
