import {StyleSheet} from 'react-native';

export const grisAzul = '#495867';
export const azulOscuro = '#0B132B';
export const rojo = '#800408';
export const azulClarito = '#BDD5EA';
export const blanco = '#F7F7FF';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: grisAzul,
    paddingTop: 45,
    paddingBottom: 5,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    fontFamily: 'Helvetica',
  },
  logInForm: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
  },
  title: {
    padding: 60,
    paddingTop: 150,
    fontSize: 50,
    color: rojo,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  h1: {
    fontSize: 30,
    textAlign: 'center',
    color: blanco,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 30,
    textAlign: 'center',
    color: blanco,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 25,
    textAlign: 'center',
    color: blanco,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B132B',
    alignSelf: 'flex-start',
  },
  labelCentered: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B132B',
    alignSelf: 'center',
    paddingBottom: 1,
    paddingTop: 1,
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    color: '#0B132B',
    alignSelf: 'center',
    paddingBottom: 1,
    marginBottom: 20,
    paddingTop: 1,
  },
  confirmado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    alignSelf: 'flex-start',
  },
  textInput: {
    alignSelf: 'flex-start',
    width: 300,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: azulOscuro,
    marginBottom: 40,
    marginTop: 5,
    color: azulOscuro,
    backgroundColor: blanco,
    borderRadius: 5,
  },
  buttonAzulOscuro: {
    backgroundColor: azulOscuro,
    alignItems: 'center',
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 45,
  },
  buttonBlanco: {
    backgroundColor: blanco,
    alignItems: 'center',
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 45,
    marginBottom: 40,
  },
  buttonLogInText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: blanco,
  },
  buttonBlancoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: grisAzul,
  },
  buttonAceptar: {
    backgroundColor: 'green',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 45,
  },
  buttonAceptarDisabled: {
    backgroundColor: 'gray',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 45,
  },
  buttonCancelar: {
    backgroundColor: rojo,
    alignItems: 'center',
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 45,
  },
  buttonTurnoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: blanco,
  },
  turno: {
    backgroundColor: blanco,
    padding: 10,
    borderTopColor: grisAzul,
    borderTopWidth: 1,
  },
  twoColumns: {
    flex: 2,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 5,
    paddingTop: 5,
  },
  date: {
    width: 300,
    alignSelf: 'flex-start',
    borderWidth: 0,
    borderColor: blanco,
    borderRadius: 4,
    backgroundColor: blanco,
    marginTop: 20,
    marginBottom: 40,
  },
  centered: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 20,
    paddingBottom: 60,
  },
  notificacion: {
    backgroundColor: blanco,
    padding: 10,
    borderTopColor: grisAzul,
    borderTopWidth: 1,
  },
  calendar: {
    backgroundColor: '#F7F7FF',
    marginBottom: 20,
    marginTop: 20,
  },
});

export const pickerStyle = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F7F7FF',
    marginTop: 20,
    marginBottom: 20,
    width: 300,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F7F7FF',
    marginTop: 20,
    marginBottom: 20,
    width: 300,
  },
};