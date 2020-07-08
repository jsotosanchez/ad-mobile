import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ReservarTurnoPaso1 from '../screens/reservarTurno/ReservarTurnoPaso1';
import TurnosDelDia from '../screens/editarAgenda/TurnosDelDia';
import ReservarTurnoPaso2 from '../screens/reservarTurno/ReservarTurnoPaso2';
import ReservarTurnoPaso3 from '../screens/reservarTurno/ReservarTurnoPaso3';
import { styles } from '../../styles';

const ScheduleAppointmentNavigation = createStackNavigator();

export const ScheduleAppointmentStackNavigation = () => {
  return (
    <View style={styles.container}>
      <ScheduleAppointmentNavigation.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <ScheduleAppointmentNavigation.Screen
          name="Reserva de turno"
          component={ReservarTurnoPaso1}
          options={{
            title: 'Reservar turno',
            headerStyle: { backgroundColor: '#495867' },
            headerTitleStyle: styles.h1,
            headerBackTitle: 'Volver',
          }}
        />
        <ScheduleAppointmentNavigation.Screen
          name="Paso2"
          component={ReservarTurnoPaso2}
          options={{
            title: 'Reservar Turno',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Volver',
            headerTitleStyle: styles.h1,
          }}
        />
        <ScheduleAppointmentNavigation.Screen
          name="Paso3"
          component={ReservarTurnoPaso3}
          options={{
            title: 'Reservar Turno',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Volver',
            headerTitleStyle: styles.h1,
          }}
        />
        <ScheduleAppointmentNavigation.Screen
          name="TurnosDelDia"
          component={TurnosDelDia}
          options={{
            title: 'Turnos',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Volver',
            headerTitleStyle: styles.h1,
          }}
        />
      </ScheduleAppointmentNavigation.Navigator>
    </View>
  );
};
