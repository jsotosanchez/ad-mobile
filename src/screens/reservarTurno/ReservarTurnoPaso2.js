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
import BackButton from '../../navigation/BackButton';

const placeholderMedico = {
  label: '(opcional)',
  value: null,
};

export default function ReservarTurnoPaso2({ navigation, route }) {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const options = useOptions(context);
  const { especialidad } = route.params;
  const [medico, setMedico] = useState();
  const { data: medicos } = useGet(urlMedicosPorEspecialidad(especialidad), null, options);
  const { data: turnos, status } = useGet(urlTurnosDisponibles(especialidad), null, options);

  const medicosPicker = useMemo(() => medicos.map((m) => ({ label: m.nombre, value: m.id })), [medicos]);

  const handleMedicos = (value) => {
    setMedico(value);
  };

  function irAPantallaSiguiente() {
    let turnosSeleccionados;
    if (medico) {
      if (turnos[medico]) turnosSeleccionados = turnos[medico];
      else turnosSeleccionados = [];
    } else {
      turnosSeleccionados = Object.values(turnos).reduce((acc, curr) => merge(acc, curr));
    }
    if (turnosSeleccionados.length === 0) {
      Alert.alert('Lo sentimos, ese medico no tiene turnos disponibles');
      return;
    }
    navigation.navigate('Paso3', { medico, turnosSeleccionados });
  }

  const agregarAColaDeEspera = () => {
    fetchPost(urlColaDeEspera(), options, {
      especialidadId: especialidad,
      medicoId: medico,
      pacienteId: userId,
    })
      .then(() => {
        Alert.alert('Se te agrego exitosamente a la cola de espera');
        navigation.popToTop();
      })
      .catch(() => Alert.alert('Ha ocurrido un error, intenta mas tarde'));
  };

  if (status === 'DONE' && Object.keys(turnos).length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton navigation={navigation} />
          <Text style={styles.h1}>Reservar Turno</Text>
        </View>
        <View style={styles.centered}>
          <Text style={styles.labelCentered}>No hay turnos disponibles</Text>
          <Text style={styles.text}>Quieres anotarte en la cola de espera?</Text>
          {medicosPicker && (
            <>
              <Text style={styles.label}>Selecciona tu medico</Text>
              <View style={styles.label}>
                <RNPickerSelect
                  onValueChange={handleMedicos}
                  items={medicosPicker}
                  style={pickerStyle}
                  doneText="Aceptar"
                  value={medico}
                  placeholder={placeholderMedico}
                />
              </View>
            </>
          )}
          <TouchableOpacity style={styles.buttonAzulOscuro} onPress={agregarAColaDeEspera}>
            <Text style={styles.buttonLogInText}>Anotarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.h1}>Reservar Turno</Text>
      </View>
      <View style={styles.centered}>
        {medicosPicker && (
          <>
            <Text style={styles.label}>Selecciona tu medico</Text>
            <View style={styles.label}>
              <RNPickerSelect
                onValueChange={handleMedicos}
                items={medicosPicker}
                style={pickerStyle}
                doneText="Aceptar"
                value={medico}
                placeholder={placeholderMedico}
              />
            </View>
          </>
        )}
        <TouchableOpacity style={styles.buttonAzulOscuro} onPress={irAPantallaSiguiente}>
          <Text style={styles.buttonLogInText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
