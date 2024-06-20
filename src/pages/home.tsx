import { useEffect, useRef, useState } from 'react';
import { CurrencyTypes } from '../models/coinbase.types';
import { WebSocketManager } from '../utils/webSocketManager';
import { Box } from '@mui/material';
import { CurrencySelector } from '../components/currencySelector';

const HomePage = () => {
  // const [bids, setBids] = useState<TupleArrayType>([]);
  // const [asks, setAsks] = useState<TupleArrayType>([]);
  const [currency, setCurrency] = useState<CurrencyTypes>('BTC-USD');
  // const [increment, setIncrement] = useState<number>(0.01); // Default increment
  const wsManagerRef = useRef<WebSocketManager | null>(null);
  const isInit = useRef<boolean>(false);

  useEffect(() => {
    // create class only one
    if (!isInit.current) {
      wsManagerRef.current = new WebSocketManager(import.meta.env.VITE_WEBSOCKET_FEED);
      isInit.current = true;
    }
    // connect to product
    wsManagerRef.current.connect(currency);
    return () => {
      if (wsManagerRef.current) {
        wsManagerRef.current.disconnect();
      }
    };
  }, [currency]);

  const handleNewCurrency = (newCurrency: CurrencyTypes) => {
    // disconnect with current one
    if (wsManagerRef.current) {
      wsManagerRef.current.disconnect();
    }

    setCurrency(newCurrency);
  };

  return (
    <Box display='flex' width='100%' height='100%' px={5} py={2}>
      {/* Top side  */}
      <Box>
        <CurrencySelector currentCurrency={currency} setCurrentCurrency={handleNewCurrency} />
      </Box>
    </Box>
  );
};

export default HomePage;
