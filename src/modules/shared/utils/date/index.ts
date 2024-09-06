import dayjs from 'dayjs';

export const FULL_DATE_LONG_FORMAT = 'MMM D, YYYY [at] hh:mm a';
export const FULL_MONTH_DATE_FORMAT = 'MMMM D, YYYY';
export const SHORT_DATE_FORMAT = 'MMM D';

type DateFormat =
  | typeof FULL_DATE_LONG_FORMAT
  | typeof FULL_MONTH_DATE_FORMAT
  | typeof SHORT_DATE_FORMAT;

export const formatDate = (date: Date | string, dateFormat: DateFormat) => {
  return dayjs(date).format(dateFormat);
};
