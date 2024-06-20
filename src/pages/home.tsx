import { useEffect, useRef, useState } from 'react';
import { CurrencyTypes } from '../models/coinbase.types';
import { WebSocketManager } from '../utils/webSocketManager';
import { Box } from '@mui/material';

const HomePage = () => {
  // const [bids, setBids] = useState<TupleArrayType>([]);
  // const [asks, setAsks] = useState<TupleArrayType>([]);
  const [currency, _] = useState<CurrencyTypes>('ETH-USD');
  // const [increment, setIncrement] = useState<number>(0.01); // Default increment
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

  return (
    <Box display='flex' width='100%' height='100%'>
      <h6>You are on home page </h6>
    </Box>
  );
};

export default HomePage;
