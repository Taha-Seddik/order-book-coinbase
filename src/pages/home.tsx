import { useEffect, useState } from 'react';
import { CurrencyTypes } from '../models/coinbase.types';
import { Box } from '@mui/material';
import { CurrencySelector } from '../components/currencySelector';
import { useAppDispatch } from '../store/store';
import { connectToCoinbaseWebSocket, disconnectFromCoinbaseWebSocket } from '../store/actions';

const HomePage = () => {
  const dispatch = useAppDispatch();
  // const [bids, setBids] = useState<TupleArrayType>([]);
  // const [asks, setAsks] = useState<TupleArrayType>([]);
  const [currency, setCurrency] = useState<CurrencyTypes>('BTC-USD');
  // const [increment, setIncrement] = useState<number>(0.01); // Default increment

  useEffect(() => {
    // connect to product
    dispatch(connectToCoinbaseWebSocket(currency));
    return () => {
      dispatch(disconnectFromCoinbaseWebSocket());
    };
  }, [dispatch, currency]);

  const handleNewCurrency = (newCurrency: CurrencyTypes) => {
    // disconnect from current one
    dispatch(disconnectFromCoinbaseWebSocket());
    setCurrency(newCurrency);
  };

  return (
    <Box display='flex' width='100vw' height='100vh'>
      {/* Top side  */}
      <Box display='flex' mt={4} ml={4} height='fit-content' width='20%' alignItems='center' justifyContent='center'>
        <CurrencySelector currentCurrency={currency} setCurrentCurrency={handleNewCurrency} />
      </Box>
    </Box>
  );
};

export default HomePage;
