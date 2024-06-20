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
    <Paper variant='outlined'>
      <Box bgcolor={bgColor} p={2}>
        <Typography variant='h6' color='white'>
          {cardTitle}
        </Typography>
      </Box>
      <Box display='flex' px={5} py={3}>
        <Box display='flex' flexDirection='column'>
          <Typography variant='subtitle1' fontWeight={600}>
            {blockDetais.bestPrice}
          </Typography>
          <Typography variant='caption'>{prefix} Price</Typography>
        </Box>
        <Divider orientation='vertical' variant='middle' sx={{ height: '100%', mx: 2 }} />
        <Box display='flex' flexDirection='column'>
          <Typography variant='subtitle1' fontWeight={600}>
            {blockDetais.bestQte}
          </Typography>
          <Typography variant='caption'>{prefix} Quantity</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
