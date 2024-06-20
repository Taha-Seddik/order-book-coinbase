import { useEffect, useState } from 'react';
import { CurrencyTypes } from '../models/coinbase.types';
import { Box } from '@mui/material';
import { CurrencySelector } from '../components/currencySelector';
import { useAppDispatch, useAppSelector } from '../store/store';
import { connectToCoinbaseWebSocket, disconnectFromCoinbaseWebSocket } from '../store/actions';
import { selectBestAskDetails, selectBestBidDetails } from '../store/coinbaseSlice/coinbase.selectors';
import { BestInfoBlock } from '../components/bestInfoBlock';

const HomePage = () => {
  const dispatch = useAppDispatch();
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
    <Box mx={4} display='flex' flexDirection='column' alignItems='center' width='100vw' height='100vh'>
      {/* Top side  */}
      <Box display='flex' mt={4} height='fit-content' width='20%' alignItems='center' justifyContent='center'>
        <CurrencySelector currentCurrency={currency} setCurrentCurrency={handleNewCurrency} />
      </Box>
      <BestsBlock />
    </Box>
  );
};

const BestsBlock: React.FC<{}> = () => {
  const bestBidDetails = useAppSelector((state) => selectBestBidDetails(state));
  const bestAskDetails = useAppSelector((state) => selectBestAskDetails(state));

  return (
    <Box display='flex' alignItems='center' justifyContent='center' gap={4} width='100%' mt={4}>
      <BestInfoBlock bgColor='#009Fcf' blockDetais={bestBidDetails} cardTitle='Best Bid' prefix='Bid' />
      <BestInfoBlock bgColor='#FCB146' blockDetais={bestAskDetails} cardTitle='Best Ask' prefix='Ask' />
    </Box>
  );
};

export default HomePage;
