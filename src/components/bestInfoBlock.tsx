import { Box, Divider, Paper, Typography } from '@mui/material';

type IProps = {
  blockDetais: { bestQte: string; bestPrice: string };
  bgColor: string;
  cardTitle: string;
  prefix: string;
};

export const BestInfoBlock: React.FC<IProps> = ({ blockDetais, prefix, cardTitle, bgColor }) => {
  if (!blockDetais) return null;
  return (
    <Paper variant='outlined' sx={{ width: '30%' }}>
      <Box bgcolor={bgColor} p={2}>
        <Typography variant='h6' color='white'>
          {cardTitle}
        </Typography>
      </Box>
      <Box display='flex' height='100px' overflow='hidden'>
        <Box display='flex' flexDirection='column' width='45%' px={4} py={2}>
          <Typography variant='subtitle1' fontWeight={600}>
            {blockDetais.bestPrice}
          </Typography>
          <Typography variant='caption'>{prefix} Price</Typography>
        </Box>
        <Divider orientation='vertical' variant='fullWidth' sx={{ mx: 2 }} />
        <Box display='flex' flexDirection='column' width='45%' px={4} py={2}>
          <Typography variant='subtitle1' fontWeight={600}>
            {blockDetais.bestQte}
          </Typography>
          <Typography variant='caption'>{prefix} Quantity</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
