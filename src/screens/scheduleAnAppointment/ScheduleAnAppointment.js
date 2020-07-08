import React, { useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { urlEspecialidades } from '../../config/urls';
import { useOptions } from '../../hooks/useOptions';
import { useGet } from '../../hooks/useFetch';
import { styles, pickerStyle } from '../../../styles';
import { Context as SessionContext } from '../../contextComponents/SessionContext';
import BurgerMenu from '../../navigation/BurgerMenu';

const placeholderEspecialidad = {
  label: 'Cardio...',
  value: null,
};

export default function ScheduleAnAppointment({ navigation }) {
  const context = useContext(SessionContext);
  const options = useOptions(context);
  const userIsDebtFree = context.getPagoAlDia();
  const [selectedSpecialty, setSelectedSpecialty] = useState();
  const { data: specialties, status: fetchStatus } = useGet(urlEspecialidades(), null, options);

  const specialtiesPicker = useMemo(
    () =>
      specialties.map((e) => ({
        label: e.descripcion,
        value: e.id,
      })),
    [specialties]
  );

  function submit() {
    if (!selectedSpecialty) {
      return Alert.alert('Please select a specialty', [{ text: 'OK' }]);
    } else {
      navigation.navigate('Step2', { selectedSpecialty });
    }
  }

  const handleSpecialtiesPicker = (value) => {
    setSelectedSpecialty(value);
  };

  if (userIsDebtFree) {
    return fetchStatus === 'LOADING' ? (
      <View style={styles.container}>
        <View style={styles.header}>
          <BurgerMenu navigation={navigation} />
          <Text style={styles.h1}>Schedule Appointment</Text>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.header}>
          <BurgerMenu navigation={navigation} />
          <Text style={{ ...styles.headerText, paddingTop: 10 }}>Schedule Appointment</Text>
        </View>
        <View style={styles.centered}>
          <Text style={styles.label}>Select a specialty</Text>
          {specialtiesPicker && (
            <View style={styles.label}>
              <RNPickerSelect
                onValueChange={handleSpecialtiesPicker}
                items={specialtiesPicker}
                style={pickerStyle}
                value={selectedSpecialty}
                placeholder={placeholderEspecialidad}
              />
            </View>
          )}
          <TouchableOpacity style={styles.buttonAzulOscuro} onPress={submit}>
            <Text style={styles.buttonLogInText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles.h1}>Schedule Appointment</Text>
      </View>
      <View style={styles.centered}>
        <Text style={styles.label}>It seems like you have debt. Please pay it continue using our service.</Text>
      </View>
    </View>
  );
}
