import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EditarAgenda from '../screens/editarAgenda/EditarAgenda';
import EditarAgendaStep2 from '../screens/editarAgenda/EditarAgendaStep2';
import { styles } from '../../styles';
import TurnosDelDia from '../screens/editarAgenda/TurnosDelDia';

const EditMyScheduleNavigation = createStackNavigator();

export const EditMyScheduleStackNavigation = () => {
  return (
    <View style={styles.container}>
      <EditMyScheduleNavigation.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <EditMyScheduleNavigation.Screen
          name="Edit Schedule"
          component={EditarAgenda}
          options={{
            title: 'Edit Schedule',
            headerStyle: { backgroundColor: '#495867' },
            headerTitleStyle: styles.h1,
            headerBackTitle: 'Back',
          }}
        />
        <EditMyScheduleNavigation.Screen
          name="Edit Schedule Step2"
          component={EditarAgendaStep2}
          options={{
            title: 'Edit Schedule',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Back',
            headerTitleStyle: styles.h1,
          }}
        />
        <EditMyScheduleNavigation.Screen
          name="AppointmentsOfADay"
          component={TurnosDelDia}
          options={{
            title: 'Appointments',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Back',
            headerTitleStyle: styles.h1,
          }}
        />
      </EditMyScheduleNavigation.Navigator>
    </View>
  );
};
