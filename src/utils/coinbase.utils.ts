import axios from 'axios';
import jwt from 'jsonwebtoken';

const API_KEY = 'organizations/bd68be55-cdcb-47e0-991e-35fec8dfcd97/apiKeys/6944873b-be68-418e-b12f-8098f36d37d8';
const PRIVATE_KEY = `-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEICIoV8KSl/4lL+oe9dXVejc9spsqz9X3gsKfgPFmLg5GoAoGCCqGSM49\nAwEHoUQDQgAEeyaL4KWGwdP0bJB7OJ3ZkBglDaWZxw/g8OdfSVIzx3ZfY1zVsNYL\nJWw1QZBrEk/LTxgg/RghMlvDb+paYzKhFQ==\n-----END EC PRIVATE KEY-----\n`;

const generateJWT = () => {
  const payload = {
    sub: API_KEY, // Subject
    aud: 'https://api.exchange.coinbase.com', // Audience
    // Add any other claims you need here
  };

  const options = {
    algorithm: 'ES256', // RSA SHA-256
    expiresIn: '1h', // Token expiry
  };

  const token = jwt.sign(payload, PRIVATE_KEY, options);
  return token;
};

export const buildSubscribeMessage = async (currency: string) => {
  const subscribeMessage = {
    type: 'subscribe',
    product_ids: ['ETH-USD'],
    channels: [{ name: 'level2', product_ids: ['ETH-USD'] }],
    key: API_KEY,
  };

  return subscribeMessage;
};

export const GetConversionFeeRates = async () => {
  const token = generateJWT();
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get('https://api.exchange.coinbase.com/conversions/fees', config);
};
