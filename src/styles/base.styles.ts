import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const PageContentContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  flexGrow: 1,
  background: '#ffffffa3',
  zIndex: 99,
  position: 'relative',
  overflow: 'auto',
}));
