import React, { useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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

const getStyles = (
  name: string,
  personName: string[],
  theme: Theme,
): React.CSSProperties | undefined => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

type MultipleSelectProps = {
  selectItems: string[];
  selectName: string;
  onChange: (value: string[]) => void;
};

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  selectItems,
  selectName,
  onChange,
}) => {
  const theme = useTheme();
  const [selectItemName, setSelectItemName] = React.useState<string[]>([]);

  useEffect(() => {
    onChange(selectItemName);
  }, [onChange, selectItemName]);

  const handleChange = (event: SelectChangeEvent<typeof selectItemName>) => {
    const {
      target: { value },
    } = event;
    setSelectItemName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="multiple-name-label">{selectName}</InputLabel>
        <Select
          labelId="multiple-name-label"
          id="multiple-name"
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
};

export { MultipleSelect };
