import { useEffect, useState } from 'react';
import { CurrencyTypes } from '../models/coinbase.types';
import { Box } from '@mui/material';
import { CurrencySelector } from '../components/currencySelector';
import { useAppDispatch, useAppSelector } from '../store/store';
import { connectToCoinbaseWebSocket, disconnectFromCoinbaseWebSocket } from '../store/actions';
import { selectBestAskDetails, selectBestBidDetails } from '../store/coinbaseSlice/coinbase.selectors';
import { BestInfoBlock } from '../components/bestInfoBlock';
import { LadderView } from '../components/ladderView/ladderView';
import { PriceChart } from '../components/priceChart/priceChart';

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
    <Box mt={4} display='flex' flexDirection='row' gap={2} width='100vw' height='100vh'>
      {/* Left zone  */}
      <Box display='flex' flexDirection='column' width='70%' alignItems='center'>
        {/* Top side  */}
        <Box display='flex' height='fit-content' width='20%' alignItems='center' justifyContent='center'>
          <CurrencySelector currentCurrency={currency} setCurrentCurrency={handleNewCurrency} />
        </Box>
        <BestsBlock />
        <Box mt={4} display='flex' height='500px' width='70%' alignItems='center' justifyContent='center'>
          <PriceChart />
        </Box>
      </Box>
      {/* Right zone Ladder view  */}
      <Box width='30%'>
        <LadderView />
      </Box>
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
