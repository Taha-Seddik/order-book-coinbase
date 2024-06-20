import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../store/store';
import { useMemo, useState } from 'react';
import { aggregateOrders, sortOrders } from '../../utils/coinbase.utils';
import './ladderView.scss';

export const LadderView = () => {
  const bids = useAppSelector((state) => state.coinbaseState.bids);
  const asks = useAppSelector((state) => state.coinbaseState.asks);

  const [increment, setIncrement] = useState(0.01); // Default increment

  const aggregatedBids = useMemo(() => {
    if (!bids?.length) return [];
    const groupedBids = aggregateOrders(bids, increment).slice(0, 10);
    return sortOrders(groupedBids, true);
  }, [bids, increment]);

  const aggregatedAsks = useMemo(() => {
    if (!asks?.length) return [];
    const groupedAsks = aggregateOrders(asks, increment).slice(0, 10);
    return sortOrders(groupedAsks, false);
  }, [asks, increment]);

  const spread = useMemo(() => {
    if (!bids?.length || !asks?.length) return null;
    return parseFloat(aggregatedAsks[0][0]) - parseFloat(aggregatedBids[0][0]);
  }, [aggregatedBids, aggregatedAsks]);

  if (!bids?.length || !asks?.length) return null;

  return (
    <Box className='ladderViewWrapper' mr={8}>
      <Typography variant='h6'>Order Book</Typography>
      <Box mt={2} width='100%'>
        <table className='order-book-table'>
          <thead>
            <tr>
              <th>Market Size</th>
              <th>Price (USD)</th>
            </tr>
          </thead>
          <tbody className='bidsTable'>
            {aggregatedBids.map(([price, size], index) => (
              <tr key={index}>
                <td>{size}</td>
                <td>{price}</td>
              </tr>
            ))}
          </tbody>
          <thead className='speadSide'>
            <tr>
              <th>USD Spread</th>
              <th>{spread}</th>
            </tr>
          </thead>
          <tbody className='asksTable'>
            {aggregatedAsks.map(([price, size], index) => (
              <tr key={index}>
                <td>{size}</td>
                <td>{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};
