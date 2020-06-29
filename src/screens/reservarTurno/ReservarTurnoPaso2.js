import React, { useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { urlMedicosPorEspecialidad, urlTurnosDisponibles, urlColaDeEspera } from '../../config/urls';
import { useGet } from '../../hooks/useFetch';
import { styles, pickerStyle } from '../../../styles';
import merge from 'lodash/merge';
import { fetchPost } from '../../http/post';
import { Context as SessionContext } from '../../contextComponents/SessionContext';

const placeholderMedico = {
  label: '(opcional)',
  value: null,
};

export default function ReservarTurnoPaso2({ navigation, route }) {
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const { especialidad } = route.params;
  const [medico, setMedico] = useState();
  const { data: medicos } = useGet(urlMedicosPorEspecialidad(especialidad));
  const { data: turnos, status } = useGet(urlTurnosDisponibles(especialidad));

  const medicosPicker = useMemo(() => medicos.map((m) => ({ label: m.nombre, value: m.id })), [medicos]);

  const handleMedicos = (value) => {
    setMedico(value);
  };

  function irAPantallaSiguiente() {
    let turnoSeleccionado;
    if (medico) {
      turnoSeleccionado = turnos[medico];
    } else {
      turnoSeleccionado = Object.values(turnos).reduce((acc, curr) => merge(acc, curr));
    }
    navigation.navigate('Paso3', { medico, turnoSeleccionado });
  }

  const agregarAColaDeEspera = () => {
    fetchPost(urlColaDeEspera(), {
      especialidadId: especialidad,
      medicoId: medico,
      pacienteId: userId,
    })
      .then(() => {
        Alert.alert('Se te agrego exitosamente');
        navigation.popToTop();
      })
      .catch(() => Alert.alert('Ha ocurrido un error, intenta mas tarde'));
  };

  if (status === 'DONE' && Object.keys(turnos).length === 0) {
    return (
      <View style={styles.container}>
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
