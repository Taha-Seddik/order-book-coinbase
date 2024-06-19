import { useEffect, useRef, useState } from 'react';
import './App.css';
import { L2MessageData, L2UpdateMessageData, SnapshotMessageData, TupleArrayType } from './models/coinbase.types';
import { buildSubscribeMessage } from './utils/coinbase.utils';

const currency = 'BTC-USD';

const App = () => {
  const [bids, setBids] = useState<TupleArrayType>([]);
  const [asks, setAsks] = useState<TupleArrayType>([]);
  const [increment, setIncrement] = useState<number>(0.01); // Default increment
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    console.log('shit');
    ws.current = new WebSocket('wss://ws-feed.exchange.coinbase.com');
    ws.current.onopen = () => {
      console.log('webSocket opened');
      setIsConnected(true);
    };

    ws.current.onmessage = (event: { data: string }) => {
      const data = JSON.parse(event.data) as L2MessageData;
      console.log('onmessage.data', data);
      if (data.type === 'snapshot') {
        const typedData = data as SnapshotMessageData;
        setBids(typedData.bids);
        setAsks(typedData.asks);
      } else if (data.type === 'l2update') {
        const typedData = data as L2UpdateMessageData;
        updateOrderBook(typedData.changes);
      }
    };

    return () => {
      // const unsubscribeMessage = {
      //   type: 'unsubscribe',
      //   channels: [{ name: 'level2', product_ids: [currency] }],
      // };
      // ws.current.send(JSON.stringify(unsubscribeMessage));
      // ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      sendSubscribeMessage();
    }
  }, [isConnected]);

  const sendSubscribeMessage = async () => {
    if (ws.current && isConnected) {
      const subscribeMessage = buildSubscribeMessage(currency);
      ws.current?.send(JSON.stringify(subscribeMessage));
    } else {
      setTimeout(sendSubscribeMessage, 100); // Retry after 100ms if not connected
    }
  };

  const updateOrderBook = (changes: L2UpdateMessageData['changes']) => {
    changes.forEach(([side, price, size]) => {
      if (side === 'buy') {
        updateOrders(setBids, price, size);
      } else {
        updateOrders(setAsks, price, size);
      }
    });
  };

  const updateOrders = (
    setOrders: React.Dispatch<React.SetStateAction<TupleArrayType>>,
    price: string,
    size: string,
  ) => {
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      const index = updatedOrders.findIndex((order) => order[0] === price);

      if (size === '0') {
        if (index !== -1) {
          updatedOrders.splice(index, 1);
        }
      } else {
        if (index !== -1) {
          updatedOrders[index] = [price, size];
        } else {
          updatedOrders.push([price, size]);
        }
      }

      return updatedOrders.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
    });
  };

  const aggregateOrders = (orders: TupleArrayType) => {
    const aggregated: Record<string, number> = {};
    orders.forEach(([price, size]) => {
      const roundedPrice = (Math.floor(parseFloat(price) / increment) * increment).toFixed(2);
      if (!aggregated[roundedPrice]) {
        aggregated[roundedPrice] = 0;
      }
      aggregated[roundedPrice] += parseFloat(size);
    });
    return Object.entries(aggregated).map(([price, size]) => [price, size.toFixed(2)]);
  };

  const aggregatedBids = aggregateOrders(bids);
  const aggregatedAsks = aggregateOrders(asks);

  return <></>;
};

export default App;
