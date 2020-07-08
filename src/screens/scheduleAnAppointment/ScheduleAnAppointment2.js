import React, { useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { urlMedicosPorEspecialidad, urlTurnosDisponibles, urlColaDeEspera } from '../../config/urls';
import { useGet } from '../../hooks/useFetch';
import { useOptions } from '../../hooks/useOptions';
import { styles, pickerStyle } from '../../../styles';
import merge from 'lodash/merge';
import { fetchPost } from '../../http/post';
import { Context as SessionContext } from '../../contextComponents/SessionContext';

const medicPlaceholder = {
  label: 'any',
  value: null,
};

export default function ScheduleAnAppointment2({ navigation, route }) {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const options = useOptions(context);
  const { selectedSpecialty } = route.params;
  const [selectedMedic, setSelectedMedic] = useState();
  const { data: medics } = useGet(urlMedicosPorEspecialidad(selectedSpecialty), null, options);
  const { data: availableAppointments, fetchStatus } = useGet(urlTurnosDisponibles(selectedSpecialty), null, options);

  const medicsPicker = useMemo(() => medics.map((m) => ({ label: m.nombre, value: m.id })), [medics]);

  const handleSelectMedic = (value) => {
    setSelectedMedic(value);
  };

  function goToNextScreen() {
    const availableAppointments = findAppointmentsAvailable();
    if (availableAppointments.length === 0) {
      Alert.alert('Sorry, that medic does not have any available appointments');
      return;
    }
    navigation.navigate('Step3', { availableAppointments });
  }

  const addToWaitingQueue = () => {
    fetchPost(urlColaDeEspera(), options, {
      especialidadId: selectedSpecialty,
      medicoId: selectedMedic,
      pacienteId: userId,
    })
      .then(() => {
        Alert.alert(`You've been added to the waiting queue successfully`);
        navigation.popToTop();
      })
      .catch(() => Alert.alert(`An error has occured, please try later`));
  };

  if (fetchStatus === 'DONE' && Object.keys(availableAppointments).length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.labelCentered}>There are no available appointments</Text>
          <Text style={styles.text}>Would you like to add yourself to the waiting queue?</Text>
          {medicsPicker && (
            <>
              <Text style={styles.label}>Select your medic</Text>
              <View style={styles.label}>
                <RNPickerSelect
                  onValueChange={handleSelectMedic}
                  items={medicsPicker}
                  style={pickerStyle}
                  value={selectedMedic}
                  placeholder={medicPlaceholder}
                />
              </View>
            </>
          )}
          <TouchableOpacity style={styles.buttonAzulOscuro} onPress={addToWaitingQueue}>
            <Text style={styles.buttonLogInText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (fetchStatus === 'LOADING')
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.labelCentered}>Loading...</Text>
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        {medicsPicker && (
          <>
            <Text style={styles.label}>Select your medic</Text>
            <View style={styles.label}>
              <RNPickerSelect
                onValueChange={handleSelectMedic}
                items={medicsPicker}
                style={pickerStyle}
                value={selectedMedic}
                placeholder={medicPlaceholder}
              />
            </View>
          </>
        )}
        <TouchableOpacity style={styles.buttonAzulOscuro} onPress={goToNextScreen}>
          <Text style={styles.buttonLogInText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function findAppointmentsAvailable() {
    let selectedAppointments;
    if (selectedMedic) {
      if (availableAppointments[selectedMedic]) selectedAppointments = availableAppointments[selectedMedic];
      else selectedAppointments = [];
    } else {
      selectedAppointments = Object.values(availableAppointments).reduce((acc, curr) => merge(acc, curr));
    }
    return selectedAppointments;
  }
}
