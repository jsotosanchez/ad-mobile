import React, { useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import TurnoDoctor from './TurnoDoctor';
import { fetchDelete } from '../../http/delete';
import { urlBorrarTurno } from '../../config/urls';
import moment from 'moment';

export default function TurnosDelDia({ route }) {
  const [turnos, setTurnos] = useState(route.params.turnos);

  const borrarTurno = (id, horario, getSemanaQueViene) => {
    console.log('horario', horario);
    console.log('semana que viene', getSemanaQueViene());
    console.log(moment(horario).isBefore(getSemanaQueViene()));
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
            fetchDelete(urlBorrarTurno(id));
            setTurnos((prev) => prev.filter((t) => t.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View>
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
