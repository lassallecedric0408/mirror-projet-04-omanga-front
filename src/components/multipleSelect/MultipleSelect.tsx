import React, { useEffect } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useOmangaContex } from '../../context/OmangaContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface MultipleSelectProps {
  selectItems: string[];
  selectName: string;
  type: string;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({ selectItems, selectName, type }) => {
  const { dispatch } = useOmangaContex();
  const theme = useTheme();
  const [selectItemName, setSelectItemName] = React.useState<string[]>([]);

  useEffect(() => {
    if (type === 'SET_PRODUCTS_SELECT_CATEGORY') {
      dispatch({
        type: type,
        categoryItems: selectItemName
      });
    } else if (type === 'SET_PRODUCTS_SELECT_UNIVERSE') {
      dispatch({
        type: type,
        universeItems: selectItemName
      });
    }
  }, [dispatch, selectItemName, type]);

  const handleChange = (event: SelectChangeEvent<typeof selectItemName>) => {
    const {
      target: { value },
    } = event;
    setSelectItemName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-name-label">{selectName}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectItemName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {selectItems.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectItemName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export { MultipleSelect };