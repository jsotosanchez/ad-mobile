import React, { useState, useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useGet } from '../../hooks/useFetch';
import { useOptions } from '../../hooks/useOptions';
import { fetchPatch } from '../../http/patch';
import { urlNotificacionesDeUsuario, urlMarcarNotificacionLeida } from '../../config/urls';
import { styles } from '../../../styles';
import NotificationListItem from './NotificationListItem';
import { Context as SessionContext } from '../../contextComponents/SessionContext';
import BurgerMenu from '../../navigation/BurgerMenu';

export default function Notifications({ navigation }) {
  const [refresh, setRefresh] = useState(0);
  const context = useContext(SessionContext);
  const userId = context.getUserId();
  const options = useOptions(context);

  const navigateToScheduleAppointment = () => {
    navigation.navigate('Reservar Turno');
  };

  const { data: notifications, fetchStatus } = useGet(urlNotificacionesDeUsuario(userId), refresh, options);

  const markAsRead = (id) => {
    fetchPatch(urlMarcarNotificacionLeida(id), options);
    onRefresh();
  };

  const onRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationListItem
            id={item.id}
            data={item.mensaje}
            navigateToScheduleAppointment={navigateToScheduleAppointment}
            markAsRead={markAsRead}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        refreshing={fetchStatus === 'LOADING'}
        onRefresh={() => {
          onRefresh();
        }}
      />
    </View>
  );
}
