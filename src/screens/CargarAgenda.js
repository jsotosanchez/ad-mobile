import React, { useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import RNPickerSelect from 'react-native-picker-select';
import { urlEspecialidadesDeMedico, urlPostAgenda, urlDiasPorMedico } from '../config/urls';
import { useGet } from '../hooks/useFetch';
import { Context as SessionContext } from '../contextComponents/SessionContext';
import moment from 'moment';

import { styles, pickerStyle } from '../../styles';
import { dosMesesAdelante, months, weekdays, mesQueViene } from '../helpers/calendar';
import { placeholderEspecialidad, placeholderHora } from '../helpers/pickers';
import { fetchPost } from '../http/post';

const horarios = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:30',
];

export default function CargarAgenda() {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const [especialidad, setEspecialidad] = useState();
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const { data: especialidades } = useGet(urlEspecialidadesDeMedico(userId));
  const { data: diasCargados } = useGet(urlDiasPorMedico(userId));

  function submit() {
    const fechasSonValidas = diasCargados.find((d) => moment(fechaInicio).isBefore(d) && moment(fechaFin).isAfter(d));
    if (fechasSonValidas) {
      Alert.alert('Error', 'Selecciona un rango en el que no tengas dias cargados previamente (dias grises)');
      return;
    }
    if (especialidad && fechaInicio && fechaFin && horaInicio && horaFin) {
      fetchPost(urlPostAgenda(), {
        medicoId: userId,
        especialidadId: especialidad,
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
      })
        .then(() => {
          Alert.alert('Se ha cargado tu agenda con exito');
          setEspecialidad(null);
          setFechaFin('');
          setFechaInicio('');
          setHoraInicio('');
          setHoraFin('');
        })
        .catch((e) => Alert.alert('Ha ocurrido un error intenta mas tarde' + String(e)));
      return;
    }
    Alert.alert('Por favor completa los datos');
  }

  const especialidadesPicker = useMemo(
    () =>
      especialidades.map((esp) => ({
        label: esp.descripcion,
        value: esp.id,
      })),
    [especialidades]
  );

  const horariosPicker = useMemo(
    () =>
      horarios.map((h) => ({
        label: h,
        value: h,
      })),
    [horarios]
  );

  const handleEspecialidades = (value) => {
    setEspecialidad(value);
  };

  const handleHoraInicio = (value) => {
    setHoraInicio(value);
  };

  const handleHoraFin = (value) => {
    setHoraFin(value);
  };

  const handleDateChange = (value, type) => {
    if (value) value = value.format('YYYY-MM-DD');
    if (type === 'START_DATE') setFechaInicio(value);
    else setFechaFin(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>Cargar Agenda</Text>
      </View>
      <View style={styles.centered}>
        <Text style={styles.label}>Especialidad</Text>
        {especialidadesPicker && (
          <View style={styles.label}>
            <RNPickerSelect
              onValueChange={handleEspecialidades}
              items={especialidadesPicker}
              style={pickerStyle}
              doneText="Aceptar"
              value={especialidad}
              placeholder={placeholderEspecialidad}
            />
          </View>
        )}
        <Text style={styles.label}>Rango de fechas</Text>
        <View style={styles.calendar}>
          <CalendarPicker
            // @ts-ignore
            onDateChange={(date, type) => handleDateChange(date, type)}
            minDate={mesQueViene}
            maxDate={dosMesesAdelante}
            width={300}
            allowRangeSelection={true}
            weekdays={weekdays}
            months={months}
            previousTitle="Anterior"
            nextTitle="Próximo"
            selectedDayColor="#00AEF5"
            initialDate={mesQueViene}
            disabledDates={diasCargados}
          />
        </View>
        <Text style={styles.label}>Hora Inicio</Text>
        <RNPickerSelect
          onValueChange={handleHoraInicio}
          items={horariosPicker}
          style={pickerStyle}
          doneText="Aceptar"
          value={horaInicio}
          placeholder={placeholderHora}
        />
        <Text style={styles.label}>Hora Fin</Text>
        <RNPickerSelect
          onValueChange={handleHoraFin}
          items={horariosPicker}
          style={pickerStyle}
          doneText="Aceptar"
          value={horaFin}
          placeholder={placeholderHora}
        />
        <TouchableOpacity style={styles.buttonAzulOscuro} onPress={submit}>
          <Text style={styles.buttonLogInText}>Cargar Agenda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
