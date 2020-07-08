import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EditMySchedule from '../screens/editarAgenda/EditMySchedule';
import EditMyScheduleStep2 from '../screens/editarAgenda/EditMyScheduleStep2';
import { styles } from '../../styles';
import AppointmentsOfADay from '../screens/editarAgenda/AppointmentsOfADay';

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
          component={EditMySchedule}
          options={{
            title: 'Edit Schedule',
            headerStyle: { backgroundColor: '#495867' },
            headerTitleStyle: styles.h1,
            headerBackTitle: 'Back',
          }}
        />
        <EditMyScheduleNavigation.Screen
          name="Edit Schedule Step2"
          component={EditMyScheduleStep2}
          options={{
            title: 'Edit Schedule',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Back',
            headerTitleStyle: styles.h1,
          }}
        />
        <EditMyScheduleNavigation.Screen
          name="AppointmentsOfADay"
          component={AppointmentsOfADay}
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
