import React from "react";
import { TextField, FormControl, Grid } from "@mui/material";

type ViewsProps = {
  label: string;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
};

const TextFieldTable: React.FC<ViewsProps> = ({ label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Grid container>
      <FormControl fullWidth>
        <TextField
          label={label}
          onChange={handleChange}
          variant="outlined"
          color="primary"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={value}
        />
      </FormControl>
    </Grid>
  );
};

export { TextFieldTable };
