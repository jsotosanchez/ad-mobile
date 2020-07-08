import React, { useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import RNPickerSelect from 'react-native-picker-select';
import { urlEspecialidadesDeMedico, urlPostAgenda, urlDiasPorMedico } from '../config/urls';
import { useGet } from '../hooks/useFetch';
import { useOptions } from '../hooks/useOptions';
import { Context as SessionContext } from '../contextComponents/SessionContext';
import moment from 'moment';
import { styles, pickerStyle } from '../../styles';
import { twoMonthsLater, months, weekdays, nextMonth } from '../helpers/calendar';
import { placeholderEspecialidad, placeholderHora } from '../helpers/pickers';
import { fetchPost } from '../http/post';
import BurgerMenu from '../navigation/BurgerMenu';

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00'];

export default function SetMySchedule({ navigation }) {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const [selectedSpecialty, setSelectedSpecialty] = useState();
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [startingTime, setStartingTime] = useState('');
  const [endingTime, setEndingTime] = useState('');
  const options = useOptions(context);
  const [refresh, setRefresh] = useState(0);
  const { data: specialties } = useGet(urlEspecialidadesDeMedico(userId), null, options);
  const { data: loadedDays, fetchStatus: lodadedDaysFetchStatus } = useGet(urlDiasPorMedico(userId), refresh, options);
  const datesAreValid = loadedDays.find((d) => moment(startingDate).isBefore(d) && moment(endingDate).isAfter(d));
  const allFieldsHaveData = selectedSpecialty && startingDate && endingDate && startingTime && endingTime;

  function submit() {
    if (datesAreValid) {
      Alert.alert(
        'Error',
        `You're selecting a date where you already set up with schedule. Please select a valid one (not in grey)`
      );
      return;
    }
    if (allFieldsHaveData) {
      fetchPost(urlPostAgenda(), options, {
        medicoId: userId,
        especialidadId: selectedSpecialty,
        fechaInicio: startingDate,
        fechaFin: endingDate,
        horaInicio: startingTime,
        horaFin: endingTime,
      })
        .then(() => {
          Alert.alert(`You have setted up your schedule successfully`);
          handleOnRefresh();
          setSelectedSpecialty(null);
          setEndingDate('');
          setStartingDate('');
          setStartingTime('');
          setEndingTime('');
        })
        .catch((e) => Alert.alert(`There's been an error. Please try later`));
      return;
    }
    Alert.alert('Please fill all the fields');
  }

  const handleOnRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  const specialtiesPicker = useMemo(
    () =>
      specialties.map((esp) => ({
        label: esp.descripcion,
        value: esp.id,
      })),
    [specialties]
  );

  const timeSlotsPicker = useMemo(
    () =>
      timeSlots.map((h) => ({
        label: h,
        value: h,
      })),
    [timeSlots]
  );

  const handleSpecialties = (value) => {
    setSelectedSpecialty(value);
  };

  const handleStartTime = (value) => {
    setStartingTime(value);
  };

  const handleEndTime = (value) => {
    setEndingTime(value);
  };

  const handleDateChange = (value, type) => {
    if (value) value = value.format('YYYY-MM-DD');
    if (type === 'START_DATE') setStartingDate(value);
    else setEndingDate(value);
  };

  return (
    <>
      <View style={styles.header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles.headerText}>Set Schedule</Text>
      </View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={lodadedDaysFetchStatus === 'LOADING'}
            onRefresh={handleOnRefresh}
            title="Loading..."
          />
        }
      >
        <View style={styles.centered}>
          <Text style={styles.label}>Specialty</Text>
          {specialtiesPicker && (
            <View style={styles.label}>
              <RNPickerSelect
                onValueChange={handleSpecialties}
                items={specialtiesPicker}
                style={pickerStyle}
                value={selectedSpecialty}
                placeholder={placeholderEspecialidad}
              />
            </View>
          )}
          <Text style={styles.label}>Dates</Text>
          <View style={styles.calendar}>
            <CalendarPicker
              onDateChange={(date, type) => handleDateChange(date, type)}
              minDate={nextMonth}
              maxDate={twoMonthsLater}
              width={300}
              allowRangeSelection={true}
              selectedDayColor="#00AEF5"
              initialDate={nextMonth}
              disabledDates={loadedDays}
            />
          </View>
          <Text style={styles.label}>Starting time</Text>
          <RNPickerSelect
            onValueChange={handleStartTime}
            items={timeSlotsPicker}
            style={pickerStyle}
            value={startingTime}
            placeholder={placeholderHora}
          />
          <Text style={styles.label}>Ending time</Text>
          <RNPickerSelect
            onValueChange={handleEndTime}
            items={timeSlotsPicker}
            style={pickerStyle}
            value={endingTime}
            placeholder={placeholderHora}
          />
          <TouchableOpacity style={styles.buttonAzulOscuro} onPress={submit}>
            <Text style={styles.buttonLogInText}>Set Schedule</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
