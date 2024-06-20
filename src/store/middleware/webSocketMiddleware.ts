// webSocketMiddleware.js

import { L2MessageData } from '../../models/coinbase.types';
import { buildSubscribeMessage } from '../../utils/webSocketManager.utils';
import { coinbaseSliceActions } from '../coinbaseSlice/coinbase.slice';
import store from '../store';

const wsUrl = import.meta.env.VITE_WEBSOCKET_FEED;

const webSocketMiddleware = () => {
  let ws = null;

  const connectWebSocket = (currency) => {
    ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      console.log('WebSocket opened');
      store.dispatch(coinbaseSliceActions.setConnected(true));
      subscribe(currency);
    };

    ws.onmessage = (event) => {
      handleMessage(event);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
      store.dispatch(coinbaseSliceActions.setConnected(false));
    };
  };

  const disconnectWebSocket = () => {
    if (ws) {
      ws.close();
    }
  };

  const subscribe = (currency) => {
    if (ws) {
      buildSubscribeMessage([currency])
        .then((subscribeMessage) => {
          ws.send(JSON.stringify(subscribeMessage));
        })
        .catch((err) => {
          console.error('Error:' + err);
        });
    } else {
      setTimeout(() => subscribe(currency), 100); // Retry after 100ms if not connected
    }
  };

  const handleMessage = (event: MessageEvent): void => {
    // store.dispatch(coinbaseSliceActions.setData(data));
    const data = JSON.parse(event.data) as L2MessageData;
    console.log('onmessage.data', data);
    if (data.type === 'snapshot') {
      // const typedData = data as SnapshotMessageData;
      // Set bids and asks
    } else if (data.type === 'l2update') {
      // const typedData = data as L2UpdateMessageData;
      // Update order book
    }
  };

  return (_) => (next) => (action) => {
    switch (action.type) {
      case 'CONNECT_WEBSOCKET':
        connectWebSocket(action.payload);
        break;
      case 'DISCONNECT_WEBSOCKET':
        disconnectWebSocket();
        break;
      default:
        next(action);
    }
  };
};

export default webSocketMiddleware;
