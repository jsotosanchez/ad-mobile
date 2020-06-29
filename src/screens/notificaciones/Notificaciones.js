import React, { useState, useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useGet } from '../../hooks/useFetch';
import { fetchPatch } from '../../http/patch';
import { urlNotificacionesDeUsuario, urlMarcarNotificacionLeida } from '../../config/urls';
import { styles } from '../../../styles';
import Notificacion from './Notificacion';
import { Context as SessionContext } from '../../contextComponents/SessionContext';
import BurgerMenu from '../../BurgerMenu';

export default function Notificaciones({ navigation }) {
  const [refresh, setRefresh] = useState(0);
  const context = useContext(SessionContext);
  const userId = context.getUserId();

  const irACartillaMedica = () => {
    navigation.navigate('Cartilla Médica');
  };

  const { data: notificaciones, status } = useGet(urlNotificacionesDeUsuario(userId), refresh);

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
        <BurgerMenu navigation={navigation} />
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
