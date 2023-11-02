import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/user";
import { materialUITheme } from "../../utils/materialUITheme";
import useAuthStore from "../../states/OmangaStore";
import { snackBarAlert } from "../../utils/snackBarAlert";

import {
  TextField,
  Button,
  Snackbar,
  Grid,
  CircularProgress,
} from "@mui/material";

const LoginView: React.FC = () => {
  const navigate = useNavigate();

  const Alert = snackBarAlert;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["loginUser", { email, password }],
    mutationFn: () =>
      loginUser({
        email,
        password,
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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await mutate();
  };

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
          <h2
            style={{
              color: `${materialUITheme.palette.primary.main}`,
              paddingBottom: "2rem",
            }}
          >
            Connectez vous à la communauté O'manga
          </h2>
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
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Grid item xs={6}>
              <Button variant="outlined" color="primary" type="submit">
                Connexion
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
                Pas encore de compte?
                <Link to="/signup">Inscrivez-vous ici</Link>
              </small>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "success")}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          La connexion est validée. Ravis de vous revoir!
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

export { LoginView };
