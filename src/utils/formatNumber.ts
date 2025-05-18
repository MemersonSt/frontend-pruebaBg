import numeral from 'numeral';

export function fCurrency(args: number) {
  return numeral(args).format(Number.isInteger(args) ? '$0,0.00' : '$0,0.00');
}

export function fCurrencydos(args: number) {
  return numeral(args).format(Number.isInteger(args) ? '$0,0.00' : '$0,0.00');
}

export function fPrice(args: number) {
  return numeral(args).format(Number.isInteger(args) ? '$0,0' : '$0,0.000000');
}

export function fPercent(args: number) {
  return numeral(args / 100).format('0.00%');
}

export function fPercentNormal(args: number) {
  return numeral(args).format('0.00%');
}

export function fNumber(args: number) {
  return numeral(args).format();
}

export function fShortenNumber(args: number) {
  return numeral(args).format('0.00a').replace('.00', '');
}

export function fData(args: number) {
  return numeral(args).format('0.0 b');
}
