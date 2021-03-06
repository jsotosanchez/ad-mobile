import React, { useState, useContext } from 'react';
import { View, FlatList, Alert, Text } from 'react-native';
import TurnoDoctor from './TurnoDoctor';
import { fetchDelete } from '../../http/delete';
import { urlBorrarTurno } from '../../config/urls';
import { Context as SessionContext } from '../../contextComponents/SessionContext';
import { useOptions } from '../../hooks/useOptions';
import BackButton from '../../navigation/BackButton';
import { styles } from '../../../styles';

export default function TurnosDelDia({ route, navigation }) {
  const [turnos, setTurnos] = useState(route.params.turnos);
  const context = useContext(SessionContext);
  const options = useOptions(context);

  const borrarTurno = (id) => {
    Alert.alert(
      'Está seguro?',
      'Si cancela el turno no se puede deshacer la acción',
      [
        {
          text: 'Regresar',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: () => {
            fetchDelete(urlBorrarTurno(id), options);
            setTurnos((prev) => prev.filter((t) => t.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.h1}>Turnos del dia</Text>
      </View>
      <FlatList
        data={turnos}
        renderItem={({ item }) => (
          <TurnoDoctor
            especialidad={item.especialidad}
            id={item.id}
            horario={item.horario}
            confirmado={item.confirmado}
            paciente={item.paciente}
            borrarTurno={borrarTurno}
          />
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
}
