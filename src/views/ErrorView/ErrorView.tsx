import React from "react";
import { Stack, useTheme } from "@mui/material";
import { materialUITheme } from "../../utils/materialUITheme";
import error from "../../assets/error.jpg";

interface ErrorViewProps {}

const ErrorView: React.FC<ErrorViewProps> = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        height: "77vh",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontSize: "2rem",
          marginBottom: "2rem",
          color: `${materialUITheme.palette.primary.main}`,
          textAlign: "center",
          [theme.breakpoints.down("md")]: {
            fontSize: "1.8rem",
          },
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.3rem",
          },
        }}
      >
        Désolé une erreur c'est produite !
      </p>
      <img src={error} alt="Error" style={{ width: "80%" }} />
    </Stack>
  );
};

export { ErrorView };
