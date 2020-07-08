import moment from 'moment';

export const hoy = new Date();

const getTwoMonthsLater = () => {
  const startDate = moment(new Date(hoy.getFullYear(), hoy.getMonth() + 3, 1)).subtract(1, 'days');

  return new Date(startDate);
};

export const twoMonthsLater = getTwoMonthsLater();

export const nextMonth = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);

export const getNextWeek = () => {
  const dayINeed = 1; //lunes
  return moment().add(1, 'weeks').isoWeekday(dayINeed).add(-1, 'day');
};

export const DATEFORMAT = 'YYYY-MM-DD';
