import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ReservarTurnoPaso1 from '../screens/reservarTurno/ReservarTurnoPaso1';
import TurnosDelDia from '../screens/editarAgenda/TurnosDelDia';
import ReservarTurnoPaso2 from '../screens/reservarTurno/ReservarTurnoPaso2';
import ReservarTurnoPaso3 from '../screens/reservarTurno/ReservarTurnoPaso3';
import { styles } from '../../styles';

const ReservarTurnoNavigation = createStackNavigator();

export const ReservarTurnoStackNavigation = () => {
  return (
    <View style={styles.container}>
      <ReservarTurnoNavigation.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <ReservarTurnoNavigation.Screen
          name="Reserva de turno"
          component={ReservarTurnoPaso1}
          options={{
            title: 'Reservar turno',
            headerStyle: { backgroundColor: '#495867' },
            headerTitleStyle: styles.h1,
            headerBackTitle: 'Volver',
          }}
        />
        <ReservarTurnoNavigation.Screen
          name="Paso2"
          component={ReservarTurnoPaso2}
          options={{
            title: 'Reservar Turno',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Volver',
            headerTitleStyle: styles.h1,
          }}
        />
        <ReservarTurnoNavigation.Screen
          name="Paso3"
          component={ReservarTurnoPaso3}
          options={{
            title: 'Reservar Turno',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Volver',
            headerTitleStyle: styles.h1,
          }}
        />
        <ReservarTurnoNavigation.Screen
          name="TurnosDelDia"
          component={TurnosDelDia}
          options={{
            title: 'Turnos',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Volver',
            headerTitleStyle: styles.h1,
          }}
        />
      </ReservarTurnoNavigation.Navigator>
    </View>
  );
};
