import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SelectItem } from '../../models/SelectItem';
import { useOmangaContex } from '../../context/OmangaContext';



interface SingleSelectProps {
  selectItems: SelectItem[];
  selectName: string;
  type: string;
}

const SingleSelect: React.FC<SingleSelectProps> = ({ selectItems, selectName, type }) => {

  const { dispatch } = useOmangaContex();
  const [sort, setSort] = React.useState('');

  useEffect(() => {
    if (type === 'SET_PRODUCTS_SELECT_SORT') {
      dispatch({
        type: type,
        sortItems: sort
      });
    }
  }, [dispatch, sort, type]);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

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