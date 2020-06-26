import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../../styles';
import { Calendar } from 'react-native-calendars';
import { getSemanaQueViene, dosMesesAdelante, DATEFORMAT } from '../../helpers/calendar';
import { useGet } from '../../hooks/useFetch';
import { urlDiasPorMedico } from '../../config/urls';
import moment from 'moment';

export default function EditarAgenda({ navigation }) {
  const [fecha, setFecha] = useState(null);
  const fechaInicio = getSemanaQueViene();
  const { data: diasCargados } = useGet(urlDiasPorMedico(105));

  const handleOnDateChange = ({ dateString: date }) => {
    setFecha(moment(date).format(DATEFORMAT));
  };

  const hoy = new Date();

  const diasAMarcar = useMemo(
    () =>
      Object.fromEntries(
        diasCargados.map((t) => {
          return [t, { marked: true }];
        })
      ),
    [diasCargados]
  );

  const handleNavigation = () => {
    if (!fecha) {
      Alert.alert('Por favor selecciona una fecha');
      return;
    }
    navigation.navigate('Step2', { fecha });
  };
  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.label}>Selecciona una fecha</Text>
        <View style={styles.calendar}>
          <Calendar
            minDate={hoy}
            maxDate={dosMesesAdelante}
            onDayPress={handleOnDateChange}
            markedDates={{
              ...diasAMarcar,
              [fecha]: {
                selected: true,
              },
            }}
          />
        </View>
        <TouchableOpacity style={styles.buttonAzulOscuro} onPress={() => handleNavigation()}>
          <Text style={styles.buttonLogInText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
