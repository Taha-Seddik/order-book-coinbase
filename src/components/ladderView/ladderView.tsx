import { Box, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useMemo } from 'react';
import './ladderView.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { selectAggregatedAsks, selectAggregatedBids } from '../../store/coinbaseSlice/coinbase.selectors';
import { coinbaseSliceActions } from '../../store/coinbaseSlice/coinbase.slice';

export const LadderView = () => {
  const dipatch = useAppDispatch();
  const increment = useAppSelector((state) => state.coinbaseState.increment);
  const aggregatedBids = useAppSelector((state) => selectAggregatedBids(state));
  const aggregatedAsks = useAppSelector((state) => selectAggregatedAsks(state));

  const spread = useMemo(() => {
    if (!aggregatedBids?.length || !aggregatedAsks?.length) return null;
    return parseFloat(aggregatedAsks[0][0]) - parseFloat(aggregatedBids[0][0]);
  }, [aggregatedBids, aggregatedAsks]);

  const handleIncrement = () => {
    let newVal = 0;
    if (increment == 0.01) {
      newVal = 0.05;
    } else {
      newVal = Number(increment) + 0.05;
    }
    dipatch(coinbaseSliceActions.setIncrement(newVal));
  };

  const handleDecrement = () => {
    const newVal = Math.max(Number(increment) - 0.05, 0.01);
    dipatch(coinbaseSliceActions.setIncrement(newVal));
    // setIncrement((prevV) => Math.max(prevV - 0.05, 0.01));
  };

  if (!aggregatedBids?.length || !aggregatedAsks?.length) return null;

  console.log('increment', increment);

  return (
    <Box className='ladderViewWrapper' mr={8}>
      <Typography variant='h6'>Order Book</Typography>

      <Box mt={2} width='100%'>
        <table className='order-book-table'>
          <Box component='thead' className='noBorders' border='1px solid #ddd'>
            <tr>
              <th>
                <Typography variant='subtitle1' fontWeight={600}>
                  Aggregation
                </Typography>
              </th>
              <th>
                <Box display='flex' gap={2} alignItems='center' justifyContent='center'>
                  <Typography variant='subtitle2' fontWeight={600}>
                    {increment.toFixed(2)}
                  </Typography>
                  <Box display='flex' alignItems='center'>
                    {increment > 0.01 ? (
                      <IconButton size='small' aria-label='delete' onClick={handleDecrement}>
                        <RemoveIcon />
                      </IconButton>
                    ) : null}
                    <IconButton size='small' aria-label='add' onClick={handleIncrement}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </th>
            </tr>
          </Box>
          <thead>
            <tr>
              <th>
                <Typography variant='subtitle1' fontWeight={600}>
                  Market Size
                </Typography>
              </th>
              <th>
                <Typography variant='subtitle1' fontWeight={600}>
                  Price (USD)
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody className='bidsTable'>
            {aggregatedBids.map(([price, size], index) => (
              <tr key={index}>
                <td>
                  <Typography variant='subtitle2' fontWeight={600}>
                    {size}
                  </Typography>
                </td>
                <td>
                  <Typography variant='subtitle2' fontWeight={600}>
                    {price}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
          <thead className='noBorders'>
            <tr>
              <th>
                <Typography variant='subtitle1' fontWeight={600}>
                  USD Spread
                </Typography>
              </th>
              <th>
                <Typography variant='subtitle2' fontWeight={600}>
                  {spread}
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody className='asksTable'>
            {aggregatedAsks.map(([price, size], index) => (
              <tr key={index}>
                <td>
                  <Typography variant='subtitle2' fontWeight={600}>
                    {size}
                  </Typography>
                </td>
                <td>
                  <Typography variant='subtitle2' fontWeight={600}>
                    {price}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};
