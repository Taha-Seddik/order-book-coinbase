import { L2MessageData, L2UpdateMessageData, SnapshotMessageData } from '../../models/coinbase.types';
import { buildSubscribeMessage } from '../../utils/coinbase.utils';
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
    const data = JSON.parse(event.data) as L2MessageData;
    if (data.type === 'snapshot') {
      console.log('snapshot-data', data);
      const typedData = data as SnapshotMessageData;
      store.dispatch(coinbaseSliceActions.setOrderBook({ bids: typedData.bids, asks: typedData.asks }));
      // Set bids and asks
    } else if (data.type === 'l2update') {
      const typedData = data as L2UpdateMessageData;
      store.dispatch(coinbaseSliceActions.updateOrderBook(typedData));
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
