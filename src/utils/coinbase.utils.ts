import CryptoJS from 'crypto-js';
import { TupleArrayType } from '../models/coinbase.types';

const API_KEY = import.meta.env.VITE_COINBASE_API_KEY;
const API_SECRET = import.meta.env.VITE_COINBASE_API_SECRET;
const API_PASSPHRASE = import.meta.env.VITE_COINBASE_PASSPHRASE;

const generateSignature = (timestamp: any, SIGNATURE_PATH: any) => {
  const message = `${timestamp}GET${SIGNATURE_PATH}`;
  const hmacKey = CryptoJS.enc.Base64.parse(API_SECRET);
  const hash = CryptoJS.HmacSHA256(message, hmacKey);
  return CryptoJS.enc.Base64.stringify(hash);
};

const coinbaseServerTimeApiURL = 'https://api.pro.coinbase.com/time';

export const getDifferenceWithServerTime = async () => {
  const response = await fetch(coinbaseServerTimeApiURL);
  const data = await response.json();
  const serverTime = new Date(data.iso);
  const localTime = new Date();
  const timeDifference = serverTime.getTime() - localTime.getTime();
  return timeDifference;
};

export const buildSubscribeMessage = async (currencies: string[]) => {
  const timeDifference = await getDifferenceWithServerTime();
  const timestamp = Math.floor((Date.now() + timeDifference) / 1000);
  const subscribeMessage = {
    type: 'subscribe',
    channels: [{ name: 'level2', product_ids: currencies }],
    signature: generateSignature(timestamp, '/users/self/verify'),
    key: API_KEY,
    passphrase: API_PASSPHRASE,
    timestamp: timestamp,
  };

  return subscribeMessage;
};

export const sortOrders = (orders: TupleArrayType, isBids: boolean): TupleArrayType => {
  return orders.sort((a, b) => (isBids ? parseFloat(b[0]) - parseFloat(a[0]) : parseFloat(a[0]) - parseFloat(b[0])));
};

export const isZeroString = (str) => {
  if (typeof str !== 'string' || str.trim() === '') {
    return true;
  }
  // Convert the string to a number
  const num = parseFloat(str);
  // Check if the conversion results in NaN
  if (isNaN(num)) {
    return false;
  }
  // Check if the number is zero
  return num === 0;
};

export const aggregateOrders = (orders: TupleArrayType, increment: number): TupleArrayType => {
  const aggregated = orders.reduce<Record<string, number>>((acc, [price, size]) => {
    const roundedPrice = (Math.floor(parseFloat(price) / increment) * increment).toFixed(6);
    if (!acc[roundedPrice]) {
      acc[roundedPrice] = 0;
    }
    acc[roundedPrice] += parseFloat(size);
    return acc;
  }, {});

  return Object.entries(aggregated).map(([price, size]) => [price, size.toFixed(6)]);
};
