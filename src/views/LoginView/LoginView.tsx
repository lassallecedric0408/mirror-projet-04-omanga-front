import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { loginViewStyle } from './loginViewStyle';
import { TextField, Button, Snackbar } from "@mui/material";
import { snackBarAlert } from '../../utils/snackBarAlert'
import { Link, Navigate } from "react-router-dom"
import { useOmangaContex } from '../../context/OmangaContext';

const useStyles = loginViewStyle;

interface LoginViewsProps {
}

const LoginView: React.FC<LoginViewsProps> = () => {

  const classes = useStyles();

  const { dispatch } = useOmangaContex();

  const Alert = snackBarAlert;

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [redirectUser, setRedirectUser] = useState(false)

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault()

    setEmailError(false)
    setPasswordError(false)

    if (email === '') {
      setEmailError(true)
    }
    if (password === '') {
      setPasswordError(true)
    }

    if (email && password) {
      console.log(email, password)
      dispatch({ type: 'SET_USER_IS_LOGGED', userIsLogged: true });
      handleClick('success');
      setTimeout(() => setRedirectUser(true), 2500)
    }
  }

  const handleClick = (e: string) => {
    if (e === 'success') { setOpenSuccessMessage(true) }
    if (e === 'error') { setOpenErrorMessage(true) }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string, state?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (state === 'success') {
      setOpenSuccessMessage(false)
    }
    if (state === 'error') { setOpenErrorMessage(false) }
  };

  return (
    <>
      <Grid container className={`${classes.loginView} ${classes.flexCenter}`}>
        <form autoComplete="off" onSubmit={handleSubmit} className={`${classes.loginViewForm}`}>
          <h2 className={classes.formTitle}>Connectez vous à la communauté O'manga </h2>
          <TextField
            type="email"
            variant='outlined'
            color='primary'
            label="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            error={emailError}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <TextField
            type="password"
            variant='outlined'
            color='primary'
            label="Mot de passe"
            onChange={e => setPassword(e.target.value)}
            value={password}
            error={passwordError}
            required
            fullWidth
            sx={{ mb: 3 }}
          />
          <Grid className={`${classes.submitContainer}`}>
            <Grid item xs={6}>
              <Button variant="outlined" color="primary" type="submit">Connexion</Button>
            </Grid>
            <Grid item xs={6} className={`${classes.flexCenter}`}>
              <small>Pas encore de compte? <Link to="/signup">Inscrivez-vous ici</Link></small>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Snackbar open={openSuccessMessage} autoHideDuration={2000} onClose={(event, reason) => handleClose(event, reason, 'success')}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          La connexion est validée. Ravis de vous revoir!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorMessage} autoHideDuration={2000} onClose={(event, reason) => handleClose(event, reason, 'error')}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Une erreur s'est produit. Veuillez essayer à nouveau!
        </Alert>
      </Snackbar>
      {redirectUser && (
        <Navigate to="/" />
      )}
    </>
  );
};

export { LoginView };