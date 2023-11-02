import React, { useState } from "react";
import { Stack, Button, Snackbar, Grid } from "@mui/material";
import { materialUITheme } from "../../utils/materialUITheme";
import { snackBarAlert } from "../../utils/snackBarAlert";

type UpdateBookingStatusProps = {
  item: string;
  onClose: () => void;
};

const UpdateBookingStatus: React.FC<UpdateBookingStatusProps> = ({
  item,
  onClose,
}) => {
  const Alert = snackBarAlert;

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const handleClick = (e: string) => {
    if (e === "success") {
      setOpenSuccessMessage(true);
    }
    if (e === "error") {
      setOpenErrorMessage(true);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
    state?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    if (state === "success") {
      setOpenSuccessMessage(false);
    }
    if (state === "error") {
      setOpenErrorMessage(false);
    }
  };

  const HandleDeleteRow = () => {
    handleClick("success");
    setTimeout(onClose, 2000);
  };

  return (
    <>
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Grid item>
          <h2
            style={{
              color: `${materialUITheme.palette.primary.main}`,
              fontSize: "1.6rem",
              marginBottom: "2rem",
            }}
          >
            Voulez-vous archiver {item}
          </h2>
        </Grid>
        <Stack spacing={10} direction="row">
          <Button variant="contained" onClick={HandleDeleteRow}>
            Archiver
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>
        </Stack>
      </Grid>

      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "success")}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          La réservation a bien été archivée!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "error")}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Une erreur s'est produit. Veuillez essayer à nouveau!
        </Alert>
      </Snackbar>
    </>
  );
};

export { UpdateBookingStatus };
