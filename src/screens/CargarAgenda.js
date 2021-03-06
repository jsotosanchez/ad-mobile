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
import { dosMesesAdelante, months, weekdays, mesQueViene } from '../helpers/calendar';
import { placeholderEspecialidad, placeholderHora } from '../helpers/pickers';
import { fetchPost } from '../http/post';
import BurgerMenu from '../navigation/BurgerMenu';

const horarios = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:30'];

export default function CargarAgenda({ navigation }) {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const [especialidad, setEspecialidad] = useState();
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const options = useOptions(context);
  const [refresh, setRefresh] = useState(0);
  const { data: especialidades } = useGet(urlEspecialidadesDeMedico(userId), null, options);
  const { data: diasCargados, status } = useGet(urlDiasPorMedico(userId), refresh, options);

  function submit() {
    const fechasSonValidas = diasCargados.find((d) => moment(fechaInicio).isBefore(d) && moment(fechaFin).isAfter(d));
    if (fechasSonValidas) {
      Alert.alert('Error', 'Selecciona un rango en el que no tengas dias cargados previamente (dias grises)');
      return;
    }
    if (especialidad && fechaInicio && fechaFin && horaInicio && horaFin) {
      fetchPost(urlPostAgenda(), options, {
        medicoId: userId,
        especialidadId: especialidad,
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
      })
        .then(() => {
          Alert.alert('Se ha cargado tu agenda con exito');
          handleOnRefresh();
          setEspecialidad(null);
          setFechaFin('');
          setFechaInicio('');
          setHoraInicio('');
          setHoraFin('');
        })
        .catch((e) => Alert.alert('Ha ocurrido un error, intenta mas tarde'));
      return;
    }
    Alert.alert('Por favor completa los datos');
  }

  const handleOnRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

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
    <>
      <View style={styles.header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles.h1}>Cargar Agenda</Text>
      </View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={status === 'LOADING'} onRefresh={handleOnRefresh} title="Cargando..." />
        }
      >
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
      </ScrollView>
    </>
  );
}
