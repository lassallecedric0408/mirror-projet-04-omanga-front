import React from "react";
import { Stack, Typography } from "@mui/material";
import construction from "../../assets/under-construction.jpg";

const Preference: React.FC = () => {
  return (
    <Stack
      sx={{
        height: "vh",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        En construction !
      </Typography>
      <img
        src={construction}
        alt="Under contruction"
        style={{ width: "40%" }}
      />
    </Stack>
  );
};

export { Preference };
