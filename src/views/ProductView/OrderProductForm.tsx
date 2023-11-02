import React, { useState } from "react";
import useAuthStore from "../../states/OmangaStore";
import { useMutation } from "react-query";

import { createOneBooking } from "../../services/bookings";

import {
  Button,
  Snackbar,
  Stack,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import { materialUITheme } from "../../utils/materialUITheme";
import { snackBarAlert } from "../../utils/snackBarAlert";

type OrderProductFormProps = {
  name: string | undefined;
  onClose: () => void;
  id: string | undefined;
};

const OrderProductForm: React.FC<OrderProductFormProps> = ({
  name,
  onClose,
  id,
}) => {
  const user = useAuthStore((state) => state.user.user);

  const Alert = snackBarAlert;

  const OrderArray = Array.from({ length: 10 }).map((_, index) => ({
    value: index + 1,
    slug: `${index + 1}`,
  }));

  const [openSuccessCreateMessage, setOpenSuccessCreateMessage] =
    useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const [orderProductNumber, setOrderProductNumber] = useState("1");

  const productQuantity = Number(orderProductNumber);
  const productId = Number(id);
  const userId = user.id;
  const userMail = user.email;

  const { mutate, isLoading } = useMutation({
    mutationKey: [
      "loginUser",
      { productQuantity, productId, userId, userMail },
    ],
    mutationFn: () =>
      createOneBooking({
        productQuantity,
        productId,
        userId,
        userMail,
      }),
    onSettled: (data, error) => {
      if (error) {
        handleClick("error");
      }
      if (data) {
        handleClick("success");
        setTimeout(onClose, 2000);
      }
    },
  });

  const handleOrderProductNumber = (event: SelectChangeEvent) => {
    setOrderProductNumber(event.target.value);
  };

  const handleClick = (e: string) => {
    if (e === "success") {
      setOpenSuccessCreateMessage(true);
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
      setOpenSuccessCreateMessage(false);
    }
    if (state === "error") {
      setOpenErrorMessage(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
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
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{ width: "80%" }}
        >
          <h2
            style={{
              color: `${materialUITheme.palette.primary.main}`,
              fontSize: "1.6rem",
              marginBottom: "2rem",
            }}
          >
            Réservation
          </h2>
          <Grid container>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4
                style={{
                  color: `${materialUITheme.palette.primary.main}`,
                  fontSize: "1.6rem",
                  fontFamily: "Caveat",
                }}
              >
                Produit réservé: {name}
              </h4>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="product-number-select">
                Nombre de produits
              </InputLabel>
              <Select
                labelId="product-number-select"
                id="univers-select-disabled"
                value={orderProductNumber}
                label="Univers"
                onChange={handleOrderProductNumber}
                fullWidth
                required
                sx={{ mb: 3 }}
              >
                {OrderArray.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.slug}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Stack spacing={10} direction="row"></Stack>
          <Stack
            spacing={10}
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              sx={{ marginTop: "2rem" }}
            >
              Réserver votre produit
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Annuler
            </Button>
          </Stack>
        </form>
      </Grid>
      <Snackbar
        open={openSuccessCreateMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "success")}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Votre réservation est bien enregistrée!
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

export { OrderProductForm };
