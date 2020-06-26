import React, { useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { urlEspecialidades } from '../../config/urls';
import { useGet } from '../../hooks/useFetch';
import { styles, pickerStyle } from '../../../styles';
const placeholderEspecialidad = {
  label: 'Selecciona una especialidad',
  value: null,
};

export default function ReservarTurnoPaso1({ navigation }) {
  const [especialidad, setEspecialidad] = useState();
  const { data: especialidades, status } = useGet(urlEspecialidades());

  const especialidadesPicker = useMemo(
    () =>
      especialidades.map((e) => ({
        label: e.descripcion,
        value: e.id,
      })),
    [especialidades]
  );

  function submit() {
    if (!especialidad) {
      return Alert.alert('ERROR!', 'Por favor selecciona una especialidad', [{ text: 'OK' }]);
    } else {
      navigation.navigate('Paso2', { especialidad });
    }
  }

  const handleEspecialidades = (value) => {
    setEspecialidad(value);
  };

  return status === 'LOADING' ? (
    <View>
      <Text>loading...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.label}>Seleccionad una especialidad</Text>
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
        <TouchableOpacity style={styles.buttonAzulOscuro} onPress={submit}>
          <Text style={styles.buttonLogInText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
