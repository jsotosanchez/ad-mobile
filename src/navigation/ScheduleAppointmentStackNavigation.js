import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleAnAppointment from '../screens/scheduleAnAppointment/ScheduleAnAppointment';
import ScheduleAnAppointment2 from '../screens/scheduleAnAppointment/ScheduleAnAppointment2';
import ScheduleAnAppointment3 from '../screens/scheduleAnAppointment/ScheduleAnAppointment3';
import { styles } from '../../styles';

const ScheduleAppointmentNavigation = createStackNavigator();

export const ScheduleAppointmentStackNavigation = () => {
  return (
    <View style={styles.container}>
      <ScheduleAppointmentNavigation.Navigator>
        <ScheduleAppointmentNavigation.Screen
          name="ScheduleAppointment"
          component={ScheduleAnAppointment}
          options={{
            headerShown: false,
          }}
        />
        <ScheduleAppointmentNavigation.Screen
          name="Step2"
          component={ScheduleAnAppointment2}
          options={{
            title: 'Schedule Appointment',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Back',
            headerTitleStyle: styles.headerText,
          }}
        />
        <ScheduleAppointmentNavigation.Screen
          name="Step3"
          component={ScheduleAnAppointment3}
          options={{
            title: 'Schedule Appointment',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Back',
            headerTitleStyle: styles.headerText,
          }}
        />
      </ScheduleAppointmentNavigation.Navigator>
    </View>
  );
};
