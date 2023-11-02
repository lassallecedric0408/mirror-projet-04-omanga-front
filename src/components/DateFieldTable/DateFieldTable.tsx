import React from "react";
import { TextField, FormControl, Grid } from "@mui/material";

type ViewsProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const DateFieldTable: React.FC<ViewsProps> = ({ label, value, onChange }) => {
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
          type="date"
          sx={{ mb: 3 }}
          fullWidth
          value={value}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
    </Grid>
  );
};

export { DateFieldTable };
