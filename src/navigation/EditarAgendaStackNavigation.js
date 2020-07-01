import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EditarAgenda from '../screens/editarAgenda/EditarAgenda';
import EditarAgendaStep2 from '../screens/editarAgenda/EditarAgendaStep2';
import { styles } from '../../styles';
import TurnosDelDia from '../screens/editarAgenda/TurnosDelDia';

const EditarAgendaNavigation = createStackNavigator();

export const EditarAgenaStackNavigation = () => {
  return (
    <View style={styles.container}>
      <EditarAgendaNavigation.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <EditarAgendaNavigation.Screen
          name="Editar Agenda"
          component={EditarAgenda}
          options={{
            title: 'Editar Agenda',
            headerStyle: { backgroundColor: '#495867' },
            headerTitleStyle: styles.h1,
            headerBackTitle: 'Volver',
          }}
        />
        <EditarAgendaNavigation.Screen
          name="Step2"
          component={EditarAgendaStep2}
          options={{
            title: 'Editar Agenda',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Volver',
            headerTitleStyle: styles.h1,
          }}
        />
        <EditarAgendaNavigation.Screen
          name="TurnosDelDia"
          component={TurnosDelDia}
          options={{
            title: 'Turnos',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Volver',
            headerTitleStyle: styles.h1,
          }}
        />
      </EditarAgendaNavigation.Navigator>
    </View>
  );
};
