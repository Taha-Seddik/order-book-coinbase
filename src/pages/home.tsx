import { useEffect, useRef, useState } from 'react';
import './App.css';
import { CurrencyTypes, TupleArrayType } from '../models/coinbase.types';
import { WebSocketManager } from '../utils/webSocketManager';

const HomePage = () => {
  const [bids, setBids] = useState<TupleArrayType>([]);
  const [asks, setAsks] = useState<TupleArrayType>([]);
  const [currency, setCurrency] = useState<CurrencyTypes>('BTC-USD');
  const [increment, setIncrement] = useState<number>(0.01); // Default increment
  const wsManagerRef = useRef<WebSocketManager | null>(null);

  useEffect(() => {
    wsManagerRef.current = new WebSocketManager(import.meta.env.VITE_WEBSOCKET_FEED);
    wsManagerRef.current.connect(currency);

    return () => {
      if (wsManagerRef.current) {
        wsManagerRef.current.disconnect();
      }
    };
  }, []);

  return <></>;
};

export default HomePage;
