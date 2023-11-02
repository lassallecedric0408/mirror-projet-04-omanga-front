import React, { useRef, useState } from "react";

import { snackBarAlert } from "../../utils/snackBarAlert";

import { TextField, Button, Snackbar, Grid } from "@mui/material";
import { materialUITheme } from "../../utils/materialUITheme";

const Alert = snackBarAlert;

const ContactUSView: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setCommentError(false);

    if (firstName === "") {
      setFirstNameError(true);
    }
    if (lastName === "") {
      setLastNameError(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (comment === "") {
      setCommentError(true);
    }

    if (firstName && lastName && email && comment) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setComment("");
      handleClick("success");
    }
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

  return (
    <>
      <Grid
        container
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
        <form autoComplete="off" onSubmit={handleSubmit} ref={form}>
          <h2
            style={{
              color: `${materialUITheme.palette.primary.main}`,
              paddingBottom: "2rem",
            }}
          >
            Un besoin particulier. Contactez - nous
          </h2>
          <TextField
            label="Nom"
            onChange={(e) => setLastName(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={lastName}
            error={lastNameError}
          />
          <TextField
            label="Prenom"
            onChange={(e) => setFirstName(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="text"
            value={firstName}
            error={firstNameError}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="EMail"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="email"
            sx={{ mb: 3 }}
            fullWidth
            value={email}
            error={emailError}
          />
          <TextField
            label="Commentaire"
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={6}
            required
            variant="outlined"
            color="primary"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={comment}
            error={commentError}
          />
          <Button variant="outlined" color="primary" type="submit">
            Envoyez votre message
          </Button>
        </form>
      </Grid>
      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "success")}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Le message a bien été envoyé !
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, "error")}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          La demande n'a pas pu être envoyée !
        </Alert>
      </Snackbar>
    </>
  );
};

export { ContactUSView };
