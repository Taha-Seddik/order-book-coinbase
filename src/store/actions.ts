export const connectToCoinbaseWebSocket = (currency) => ({
  type: 'CONNECT_WEBSOCKET',
  payload: currency,
});

export const disconnectFromCoinbaseWebSocket = () => ({
  type: 'DISCONNECT_WEBSOCKET',
});
