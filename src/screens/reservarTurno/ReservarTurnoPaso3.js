import React, { useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerStyle } from '../../../styles';
import moment from 'moment';
import { fetchPatch } from '../../http/patch';
import { urlReservarTurno } from '../../config/urls';
import { Calendar } from 'react-native-calendars';
import { dosMesesAdelante as maxDate, DATEFORMAT } from '../../helpers/calendar';
import { Context as SessionContext } from '../../contextComponents/SessionContext';

const placeholderHorario = {
  label: 'Selecciona un horario',
  value: null,
};

export default function ReservarTurnoPaso3({ navigation, route }) {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const { turnoSeleccionado: turnos } = route.params;
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [fechaTurno, setFechaTurno] = useState(moment().format(DATEFORMAT));
  const hoy = new Date();

  // @ts-ignore
  const diasMarcados = Object.fromEntries(
    Object.keys(turnos).map((t) => {
      return [t, { marked: true }];
    })
  );

  const horarios = turnos[fechaTurno];

  const horariosPicker = useMemo(
    () =>
      (horarios || []).map((h) => ({
        label: h.horario.slice(11, 16),
        value: h.id,
      })),
    [horarios]
  );

  function submit() {
    if (horarioSeleccionado) {
      console.log(horarioSeleccionado);
      fetchPatch(urlReservarTurno(horarioSeleccionado), { id: userId }).then((r) => {
        if (r.status === 403) {
          Alert.alert('No puede reservar el turno', r.message);
        }
        Alert.alert('Se ha reservado el turno');
        navigation.popToTop();
      });
    } else {
      Alert.alert('Por favor selecciona un horario');
    }
  }

  const handleDateChange = ({ dateString: date }) => {
    setFechaTurno(moment(date).format(DATEFORMAT));
  };

  const handleHorarioChange = (horario) => {
    setHorarioSeleccionado(horario);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.label}>Dia</Text>
        <View style={styles.calendar}>
          <Calendar
            minDate={hoy}
            maxDate={maxDate}
            onDayPress={handleDateChange}
            markedDates={{
              ...diasMarcados,
              [fechaTurno]: {
                selected: true,
              },
            }}
            current={fechaTurno}
          />
        </View>
        <Text style={styles.label}>{horarios ? 'Horarios' : 'No hay turnos ese dia'}</Text>
        <View style={styles.label}>
          <RNPickerSelect
            onValueChange={handleHorarioChange}
            items={horariosPicker}
            style={pickerStyle}
            doneText="Aceptar"
            value={horarioSeleccionado}
            placeholder={placeholderHorario}
            disabled={!horarios}
          />
        </View>
        <TouchableOpacity style={styles.buttonAzulOscuro} onPress={submit}>
          <Text style={styles.buttonLogInText}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
