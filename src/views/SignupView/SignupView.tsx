import React, { useState } from "react";
import useAuthStore from "../../states/OmangaStore";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { snackBarAlert } from "../../utils/snackBarAlert";
import { signUpUser } from "../../services/user";

import {
  TextField,
  Button,
  Grid,
  Stack,
  Snackbar,
  CircularProgress,
  Typography,
} from "@mui/material";

const Alert = snackBarAlert;

const SignupView: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState<number | null>(null);

  const [openSuccessMessage, setOpenSuccessMessage] = React.useState(false);
  const [openErrorMessage, setOpenErrorMessage] = React.useState(false);
  const [openWarningMessage, setOpenWarningMessage] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationKey: [
      "signupUser",
      { firstName, lastName, email, password, city, zipCode },
    ],
    mutationFn: () =>
      signUpUser({
        firstName,
        lastName,
        email,
        password,
        city,
        zipCode,
      }),
    onSettled: (data, error) => {
      if (error) {
        handleClick("error");
      }
      if (data) {
        useAuthStore.setState({
          user: data?.data,
          isLogged: true,
          isAdmin: data?.data.user.role === "ADMIN" ? true : false,
        });
        localStorage.setItem(`accessToken/${email}`, data?.data.accessToken);
        localStorage.setItem(`refreshToken/${email}`, data?.data.refreshToken);
        handleClick("success");
        setTimeout(() => navigate(`/`), 2500);
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  const handleClick = (e: string) => {
    if (e === "success") {
      setOpenSuccessMessage(true);
      return redirect("/");
    }
    if (e === "error") {
      setOpenErrorMessage(true);
    }
    if (e === "warning") {
      setOpenWarningMessage(true);
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
    if (state === "warning") {
      setOpenWarningMessage(false);
    }
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
    <Grid
      container
      sx={{
        height: "77vh",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          Rejoindre la communauté O'manga
        </Typography>
        <TextField
          type="text"
          variant="outlined"
          color="primary"
          label="Nom"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          fullWidth
          required
          sx={{ mb: 3 }}
        />
        <TextField
          type="text"
          variant="outlined"
          color="primary"
          label="Prénom"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          fullWidth
          required
          sx={{ mb: 3 }}
        />
        <TextField
          type="email"
          variant="outlined"
          color="primary"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 3 }}
        />
        <TextField
          type="password"
          variant="outlined"
          color="primary"
          label="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          fullWidth
          sx={{ mb: 3 }}
        />
        <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Ville"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            fullWidth
          />
          <TextField
            type="number"
            variant="outlined"
            color="primary"
            label="Code postal"
            onChange={(e) => setZipCode(parseInt(e.target.value))}
            value={zipCode}
            fullWidth
          />
        </Stack>
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <Grid item xs={6}>
            <Button variant="outlined" color="primary" type="submit">
              Nous Rejoindre
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <small>
              Vous êtes déjà dans la communauté?{" "}
              <Link to="/login">Connectez-vous ici</Link>
            </small>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "success")}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Merci d'avoir rejoins notre communauté !
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "error")}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Un prolème est survenu, veuillez réessayer plus tard.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openWarningMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "warning")}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Votre age ne vous permet pas de vous inscrire !
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export { SignupView };
