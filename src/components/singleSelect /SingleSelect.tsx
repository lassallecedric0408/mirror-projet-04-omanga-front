import React, { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SelectItem } from '../../models/SelectItem';


interface SingleSelectProps {
  selectItems: SelectItem[];
  selectName: string | 'users' | 'admin' | 'user';
  onChange: (value: string | 'users' | 'admin' | 'user') => void;
}

const SingleSelect: React.FC<SingleSelectProps> = ({ selectItems, selectName, onChange }) => {


  const [sort, setSort] = React.useState<string>('');

  useEffect(() => {
    onChange(sort);
  }, [sort]);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
    onChange(sort);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{selectName}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        label="Sort"
        onChange={handleChange}
      >
        {
          selectItems.map((item, index) => (
            <MenuItem key={index} value={item.value}>{item.slug}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

export { SingleSelect };