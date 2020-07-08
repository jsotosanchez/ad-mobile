import React, { useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { styles } from '../../../styles';
import { Calendar } from 'react-native-calendars';
import { dosMesesAdelante, DATEFORMAT } from '../../helpers/calendar';
import { useGet } from '../../hooks/useFetch';
import { useOptions } from '../../hooks/useOptions';
import { urlDiasPorMedico } from '../../config/urls';
import moment from 'moment';
import { Context as SessionContext } from '../../contextComponents/SessionContext';
import BurgerMenu from '../../navigation/BurgerMenu';
import { ScrollView } from 'react-native-gesture-handler';

export default function EditMySchedule({ navigation }) {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const options = useOptions(context);
  const [selectedDate, setSelectedDate] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const { data: daysWithAppointments, status } = useGet(urlDiasPorMedico(userId), refresh, options);

  const handleOnDateChange = ({ dateString: date }) => {
    setSelectedDate(moment(date).format(DATEFORMAT));
  };

  const today = new Date();

  const markedDays = useMemo(
    () =>
      Object.fromEntries(
        daysWithAppointments.map((t) => {
          return [t, { marked: true }];
        })
      ),
    [daysWithAppointments, refresh]
  );

  const handleNavigation = () => {
    if (!selectedDate) {
      Alert.alert('You must select a date first');
      return;
    }
    navigation.navigate('Edit Schedule Step2', { selectedDate, handleOnRefresh });
  };

  const handleOnRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <>
      <View style={styles.header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles.headerText}>My Schedule</Text>
      </View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={status === 'LOADING'} onRefresh={handleOnRefresh} title="Loading..." />
        }
      >
        <View style={styles.centered}>
          <Text style={styles.label}>Select a date</Text>
          <View style={styles.calendar}>
            <Calendar
              minDate={today}
              maxDate={dosMesesAdelante}
              onDayPress={handleOnDateChange}
              markedDates={{
                ...markedDays,
                [selectedDate]: {
                  selected: true,
                },
              }}
            />
          </View>
          <TouchableOpacity style={styles.buttonAzulOscuro} onPress={() => handleNavigation()}>
            <Text style={styles.buttonLogInText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
