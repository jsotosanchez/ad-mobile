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
import { ScheduleAppointmentStackNavigation } from './ScheduleAppointmentStackNavigation';
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
  const isMedic = context.isMedico();
  return (
    <>
      <NavigationContainer theme={MyTheme}>
        {authorized ? <AuthorizedContent isMedic={isMedic} /> : <UnauthorizedContent />}
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
      <LogInStackNavigation.Screen name="Log In" component={SignIn} />
    </LogInStackNavigation.Navigator>
  );
}

function AuthorizedContent({ isMedic }) {
  return (
    <Drawer.Navigator initialRouteName="My Schedule">
      {isMedic ? (
        <>
          <Drawer.Screen name="My Schedule" component={EditarAgenaStackNavigation} />
          <Drawer.Screen name="Set my schedule" component={CargarAgenda} />
        </>
      ) : (
        <></>
      )}
      <Drawer.Screen name="Schedule an appointment" component={ScheduleAppointmentStackNavigation} />
      <Drawer.Screen name="My appointments" component={Turnos} />
      <Drawer.Screen name="Notifications" component={Notificaciones} />
      <Drawer.Screen name="Sign out" component={SignOut} />
    </Drawer.Navigator>
  );
}
