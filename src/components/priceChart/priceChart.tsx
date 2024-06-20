import { Box, Divider, Paper, Typography } from '@mui/material';

type IProps = {};

export const PriceChart: React.FC<IProps> = () => {
  return (
    <Paper variant='outlined' sx={{ width: '30%' }}>
      <Box p={2}>
        <Typography variant='h6' color='white'>
          Real Time Chart
        </Typography>
      </Box>
      <Divider orientation='horizontal' variant='fullWidth' sx={{ my: 2 }} />
      <Box display='flex' height='100px' overflow='hidden'></Box>
    </Paper>
  );
};
