import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CurrencyOptions } from '../utils/constants';

type IProps = {
  currentCurrency: string;
  setCurrentCurrency: (x: string) => void;
};

export const CurrencySelector: React.FC<IProps> = ({ currentCurrency, setCurrentCurrency }) => {
  const handleChange = (e: SelectChangeEvent) => {
    setCurrentCurrency(e.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id='current-selector-label'>Currency</InputLabel>
      <Select
        labelId='current-selector-label'
        id='current-selector'
        value={currentCurrency}
        label='Currency'
        onChange={handleChange}>
        {CurrencyOptions.map((o) => (
          <MenuItem key={o} value={o}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
