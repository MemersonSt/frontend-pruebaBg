import { format } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date : string | number | Date) {
  return format(new Date(date), 'dd-MM-yyyy');
}
export function fDateReverse(date : string | number | Date) {
  return format(new Date(date), 'yyyy-MM-dd');
}
export function fDateTimeReverse(date : string | number | Date) {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
}
