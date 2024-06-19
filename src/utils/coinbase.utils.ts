import crypto from 'crypto-js';

export const API_KEY = 'testing-key';
export const API_SECRET =
  '-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEICIoV8KSl/4lL+oe9dXVejc9spsqz9X3gsKfgPFmLg5GoAoGCCqGSM49\nAwEHoUQDQgAEeyaL4KWGwdP0bJB7OJ3ZkBglDaWZxw/g8OdfSVIzx3ZfY1zVsNYL\nJWw1QZBrEk/LTxgg/RghMlvDb+paYzKhFQ==\n-----END EC PRIVATE KEY-----\n';
export const API_PASSPHRASE = '6944873b-be68-418e-b12f-8098f36d37d8';

export const generateSignature = (nowTime: any) => {
  const timestamp = Math.floor(nowTime / 1000).toString();
  const message = timestamp + 'GET' + '/users/self/verify';
  const key = crypto.enc.Base64.parse(API_SECRET);
  const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, key);
  const signature = hmac.update(message).finalize().toString(crypto.enc.Base64);
  return signature;
};

const coinbaseServerTimeApiURL = 'https://api.pro.coinbase.com/time';

export const buildSubscribeMessage = async (currency: string) => {
  const response = await fetch(coinbaseServerTimeApiURL);
  const data = await response.json();
  const serverTime = new Date(data.iso);
  const localTime = new Date();
  const timeDifference = serverTime.getTime() - localTime.getTime();
  const timestamp = Math.floor(Date.now() + timeDifference + 30 * 1000);
  debugger;
  // return new Date(data.iso);
  const subscribeMessage = {
    type: 'subscribe',
    product_ids: ['ETH-USD'],
    channels: [{ name: 'level2', product_ids: ['ETH-USD'] }],
    key: API_KEY,
    passphrase: API_PASSPHRASE,
    signature: generateSignature(timestamp),
    timestamp: Math.floor(timestamp / 1000),
  };

  return subscribeMessage;
};
