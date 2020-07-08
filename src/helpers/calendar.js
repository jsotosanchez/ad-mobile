import moment from 'moment';
import { LocaleConfig } from 'react-native-calendars';

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

export const DATEFORMAT = 'YYYY-MM-DD';
