import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EditMySchedule from '../screens/editMySchedule/EditMySchedule';
import EditMyScheduleStep2 from '../screens/editMySchedule/EditMyScheduleStep2';
import { styles } from '../../styles';
import AppointmentsOfADay from '../screens/editMySchedule/AppointmentsOfADay';

const EditMyScheduleNavigation = createStackNavigator();

export const EditMyScheduleStackNavigation = () => {
  return (
    <View style={styles.container}>
      <EditMyScheduleNavigation.Navigator>
        <EditMyScheduleNavigation.Screen
          name="Edit Schedule"
          component={EditMySchedule}
          options={{
            headerShown: false,
          }}
        />
        <EditMyScheduleNavigation.Screen
          name="Edit Schedule Step2"
          component={EditMyScheduleStep2}
          options={{
            title: 'Edit Schedule',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Back',
            headerTitleStyle: styles.headerText,
          }}
        />
        <EditMyScheduleNavigation.Screen
          name="AppointmentsOfADay"
          component={AppointmentsOfADay}
          options={{
            title: 'Appointments',
            headerStyle: { backgroundColor: '#495867' },
            headerBackTitle: 'Back',
            headerTitleStyle: styles.headerText,
          }}
        />
      </EditMyScheduleNavigation.Navigator>
    </View>
  );
};
