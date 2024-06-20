import axios from 'axios';
import crypto from 'crypto-js';

const API_KEY = '797b82329f51b8984da546e5ede6af9b';
const API_SECRET = `IWd5VqRf3TaU9ldMKfXCfZyjZn900k0A3hShR9SfDJqQryul+SzqvsEiLKmLmmI8VVRNHb13tjtvojp9wbPSPA==`;
const API_PASSPHRASE = '3v68vt2cjyy';

export const generateSignature = (nowTime: any) => {
  const timestamp = Math.floor(nowTime / 1000).toString();
  const message = timestamp + 'GET' + '/users/self/verify';
  const key = crypto.enc.Base64.parse(API_SECRET);
  const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, key);
  const signature = hmac.update(message).finalize().toString(crypto.enc.Base64);
  return signature;
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

export const buildSubscribeMessage = async (currency: string) => {
  const timeDifference = await getDifferenceWithServerTime();
  const timestamp = Math.floor(Date.now() + timeDifference + 30 * 1000);
  debugger;
  // return new Date(data.iso);
  const subscribeMessage = {
    type: 'subscribe',
    channels: [{ name: 'level2', product_ids: ['ETH-USD'] }],
    key: API_KEY,
    passphrase: API_PASSPHRASE,
    signature: generateSignature(timestamp),
    timestamp: Math.floor(timestamp / 1000),
  };

  return subscribeMessage;
};

export const getCurrencies = () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.get('https://api.exchange.coinbase.com/currencies', config);
};

export const GetConversionFeeRates = async () => {
  const timeDifference = await getDifferenceWithServerTime();
  const timestamp = Math.floor(Date.now() + timeDifference + 30 * 1000);
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'application/json',
      'cb-access-key': API_KEY,
      'cb-access-sign': generateSignature(timestamp),
      'cb-access-timestamp': Math.floor(timestamp / 1000),
      'cb-access-passphrase': 'testing-key',
    },
  };

  return axios.get('https://api.exchange.coinbase.com/conversions/fees', config);
};
