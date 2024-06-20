import { useEffect } from 'react';
import './App.css';
import { GetConversionFeeRates } from './utils/coinbase.utils';

const currency = 'BTC-USD';

const App = () => {
  useEffect(() => {
    (async () => {
      const res = await GetConversionFeeRates();
      console.log('res', res);
    })();
  }, []);

  return <></>;
};

export default App;
