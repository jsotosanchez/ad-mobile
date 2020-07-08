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

export default function EditarAgenda({ navigation }) {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const options = useOptions(context);
  const [fecha, setFecha] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const { data: diasCargados, status } = useGet(urlDiasPorMedico(userId), refresh, options);

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
    [diasCargados, refresh]
  );

  const handleNavigation = () => {
    if (!fecha) {
      Alert.alert('Por favor selecciona una fecha');
      return;
    }
    navigation.navigate('Edit Schedule Step2', { fecha, handleOnRefresh });
  };

  const handleOnRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <>
      <View style={styles.header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles.h1}>Mi Agenda</Text>
      </View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={status === 'LOADING'} onRefresh={handleOnRefresh} title="Cargando..." />
        }
      >
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
      </ScrollView>
    </>
  );
}
