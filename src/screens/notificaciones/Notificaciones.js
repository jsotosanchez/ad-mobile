import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useGet } from '../../hooks/useFetch';
import { fetchPatch } from '../../http/patch';
import { urlNotificacionesDeUsuario, urlMarcarNotificacionLeida } from '../../config/urls';
import { styles } from '../../../styles';
import Notificacion from './Notificacion';

export default function Notificaciones({ navigation }) {
  const [refresh, setRefresh] = useState(0);

  const irACartillaMedica = () => {
    navigation.navigate('Cartilla Médica');
  };

  const { data: notificaciones, status } = useGet(urlNotificacionesDeUsuario(105), refresh);

  const marcarLeida = (id) => {
    fetchPatch(urlMarcarNotificacionLeida(id));
    onRefresh();
  };

  const onRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>Notificaciones</Text>
      </View>
      <FlatList
        data={notificaciones}
        renderItem={({ item }) => (
          <Notificacion
            id={item.id}
            data={item.mensaje}
            irACartillaMedica={irACartillaMedica}
            marcarLeida={marcarLeida}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        refreshing={status === 'LOADING'}
        onRefresh={() => {
          onRefresh();
        }}
      />
    </View>
  );
}
