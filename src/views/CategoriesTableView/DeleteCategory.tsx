import React, { useState } from "react";
import { useMutation } from "react-query";

import { snackBarAlert } from "../../utils/snackBarAlert";
import { Category } from "../../models/Category";
import { deleteOneCategory } from "../../services/categories";

import {
  Stack,
  Button,
  Snackbar,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

type DeleteCategoryProps = {
  row: Category;
  onClose: () => void;
  userMail: string | undefined;
};

const DeleteCategory: React.FC<DeleteCategoryProps> = ({
  row,
  onClose,
  userMail,
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

  const { mutate, isLoading } = useMutation({
    mutationKey: ["deleteCategory", { row, userMail }],
    mutationFn: () => deleteOneCategory(row.id, userMail),
    onSettled: (error) => {
      if (error) {
        handleClick("error");
      }
      if (!error) {
        handleClick("success");
        setTimeout(() => onClose(), 2500);
      }
    },
  });

  const HandleDeleteRow = async () => {
    await mutate();
  };

  if (isLoading) {
    return (
      <div
        style={{
          height: "77vh",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Stack
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          Voulez-vous supprimer la catégorie
        </Typography>

        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" onClick={HandleDeleteRow}>
              Supprimer
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button variant="outlined" onClick={onClose}>
              Annuler
            </Button>
          </Grid>
        </Grid>
      </Stack>

      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "success")}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          La catégorie a bien été supprimé!
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

export { DeleteCategory };
