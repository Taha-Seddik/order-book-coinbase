import { Box, Divider, Paper, Typography } from '@mui/material';
import Plot from 'react-plotly.js';
import { useAppSelector } from '../../store/store';
import { useMemo } from 'react';

type IProps = {};

const layout = {
  xaxis: {
    title: 'Time',
    type: 'date',
    tickformat: '%H:%M:%S', // Format time ticks
  },
  yaxis: {
    title: 'Price',
  },
};

export const PriceChart: React.FC<IProps> = () => {
  const chartData = useAppSelector((state) => state.coinbaseState.chartData);

  const finalChartData = useMemo(() => {
    const times = chartData.map((entry) => entry.time);
    const bidPrices = chartData.map((entry) => entry.bidPrice);
    const askPrices = chartData.map((entry) => entry.askPrice);

    return [
      {
        x: times,
        y: bidPrices,
        type: 'scatter',
        mode: 'lines',
        name: 'Bids',
        marker: { color: 'blue' },
      },
      {
        x: times,
        y: askPrices,
        mode: 'lines',
        name: 'Asks',
        line: { color: 'red' },
      },
    ];
  }, [chartData]);

  return (
    <Paper variant='outlined' className='paperForChart'>
      <Box p={2} display='flex' alignItems='center'>
        <Typography variant='h6'>Real Time Chart</Typography>
      </Box>
      <Divider orientation='horizontal' variant='fullWidth' />
      <Box display='flex' width='100%' overflow='hidden'>
        <Plot data={finalChartData} layout={layout} />
      </Box>
    </Paper>
  );
};
