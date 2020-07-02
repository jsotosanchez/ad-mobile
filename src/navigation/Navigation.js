import React, { useContext } from 'react';
import { azulClarito, blanco, azulOscuro } from '../../styles';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Turnos from '../screens/turnos/Turnos';
import SignIn from '../screens/SignIn';
import CargarAgenda from '../screens/CargarAgenda';
import Notificaciones from '../screens/notificaciones/Notificaciones';
import { EditarAgenaStackNavigation } from './EditarAgendaStackNavigation';
import { ReservarTurnoStackNavigation } from './ReservarTurnosStackNavigation';
import { Context as SessionContext } from '../contextComponents/SessionContext';
import SignOut from '../screens/SignOut';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: blanco,
    background: azulClarito,
    card: azulClarito,
    text: azulOscuro,
    border: azulOscuro,
  },
};

const Drawer = createDrawerNavigator();
const LogInStackNavigation = createStackNavigator();

export default function Navigation() {
  const context = useContext(SessionContext);
  const authorized = context.isAuthorized();
  const isMedico = context.isMedico();
  return (
    <>
      <NavigationContainer theme={MyTheme}>
        {authorized ? <AuthorizedContent isMedico={isMedico} /> : <UnauthorizedContent />}
      </NavigationContainer>
    </>
  );
}

function UnauthorizedContent() {
  return (
    <LogInStackNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LogInStackNavigation.Screen name="Conectarse" component={SignIn} />
    </LogInStackNavigation.Navigator>
  );
}

function AuthorizedContent({ isMedico }) {
  return (
    <Drawer.Navigator initialRouteName="Mi Agenda">
      {isMedico ? (
        <>
          <Drawer.Screen name="Mi Agenda" component={EditarAgenaStackNavigation} />
          <Drawer.Screen name="Cargar Agenda" component={CargarAgenda} />
        </>
      ) : (
        <></>
      )}
      <Drawer.Screen name="Citas Medicas" component={Turnos} />
      <Drawer.Screen name="Reservar Turno" component={ReservarTurnoStackNavigation} />
      <Drawer.Screen name="Notificaciones" component={Notificaciones} />
      <Drawer.Screen name="Salir" component={SignOut} />
    </Drawer.Navigator>
  );
}
