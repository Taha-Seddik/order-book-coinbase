import { Box } from '@mui/material';
import CircularProgress, { CircularProgressProps, circularProgressClasses } from '@mui/material/CircularProgress';
import { useAppSelector } from '../store/store';

type IProps = {
  msg?: string;
  withBg?: boolean;
};

export const AppSpinner: React.FC<IProps> = () => {
  const isLoading = useAppSelector((state) => state.coinbaseState.isLoading);
  if (isLoading) {
    return (
      <Box className='appSpinnerWrapper'>
        <SpinnerComponent />
      </Box>
    );
  }
};

export const SpinnerComponent: React.FC<IProps> = (props) => {
  return (
    <Box className={props.withBg ? 'absoluteCentredContentWithBackdrop' : 'CentredContent'}>
      <Box className='flexColumnCenterCenter'>
        <FacebookCircularProgress />
      </Box>
    </Box>
  );
};

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props: CircularProgressProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant='determinate'
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant='indeterminate'
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
