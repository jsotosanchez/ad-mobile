import React, { useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerStyle } from '../../../styles';
import moment from 'moment';
import { fetchPatch } from '../../http/patch';
import { urlReservarTurno } from '../../config/urls';
import { Calendar } from 'react-native-calendars';
import { twoMonthsLater as maxDate, DATEFORMAT } from '../../helpers/calendar';
import { Context as SessionContext } from '../../contextComponents/SessionContext';
import { useOptions } from '../../hooks/useOptions';

const timeSlotPlaceholder = {
  label: 'Select a time',
  value: null,
};

export default function ScheduleAnAppointment3({ navigation, route }) {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const options = useOptions(context);
  const { availableAppointments } = route.params;
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(moment().format(DATEFORMAT));
  const hoy = new Date();

  const markedDays = Object.fromEntries(
    Object.keys(availableAppointments).map((t) => {
      return [t, { marked: true }];
    })
  );

  // available appointments is a Map <Date, Appointment>
  const timeSlotsAvailable = availableAppointments[appointmentDate];

  const timeSlotPicker = useMemo(
    () =>
      (timeSlotsAvailable || []).map((h) => ({
        label: h.horario.slice(11, 16),
        value: h.id,
      })),
    [timeSlotsAvailable]
  );

  function submit() {
    if (selectedTime) {
      fetchPatch(urlReservarTurno(selectedTime), options, { id: userId }).then((r) => {
        if (r.status === 403) {
          // already has an appointment on that timeslot
          Alert.alert(`You can't schedule this appointment`, r.message);
          navigation.popToTop();
          return;
        }
        Alert.alert('You have scheduled your appointment successfully');
        navigation.popToTop();
      });
    } else {
      Alert.alert('Please select a time');
    }
  }

  const handleDateChange = ({ dateString: date }) => {
    setAppointmentDate(moment(date).format(DATEFORMAT));
  };

  const handleHorarioChange = (horario) => {
    setSelectedTime(horario);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.label}>Select a date</Text>
        <View style={styles.calendar}>
          <Calendar
            minDate={hoy}
            maxDate={maxDate}
            onDayPress={handleDateChange}
            markedDates={{
              ...markedDays,
              [appointmentDate]: {
                selected: true,
              },
            }}
            current={appointmentDate}
          />
        </View>
        <Text style={styles.label}>
          {timeSlotsAvailable ? 'Available times' : `There is no available appointments that date`}
        </Text>
        <View style={styles.label}>
          <RNPickerSelect
            onValueChange={handleHorarioChange}
            items={timeSlotPicker}
            style={pickerStyle}
            value={selectedTime}
            placeholder={timeSlotPlaceholder}
            disabled={!timeSlotsAvailable}
          />
        </View>
        <TouchableOpacity style={styles.buttonAzulOscuro} onPress={submit}>
          <Text style={styles.buttonLogInText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
