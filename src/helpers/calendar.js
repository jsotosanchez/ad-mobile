import moment from 'moment';
import { LocaleConfig } from 'react-native-calendars';

export const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const weekdays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
export const hoy = new Date();

const getDosMesesAdelante = () => {
  const startDate = moment(new Date(hoy.getFullYear(), hoy.getMonth() + 3, 1)).subtract(1, 'days');

  return new Date(startDate);
};

export const dosMesesAdelante = getDosMesesAdelante();

export const mesQueViene = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);

export const getSemanaQueViene = () => {
  const dayINeed = 1; //lunes
  return moment().add(1, 'weeks').isoWeekday(dayINeed).add(-1, 'day');
};

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

export const DATEFORMAT = 'YYYY-MM-DD';
