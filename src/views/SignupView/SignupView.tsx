import React, { useState } from 'react';
import { TextField, Button, Grid, Stack, Snackbar } from '@mui/material';
import { Link, redirect } from "react-router-dom";
import { snackBarAlert } from '../../utils/snackBarAlert'
import { useOmangaContex } from '../../context/OmangaContext';
import { signupViewStyle } from './signupViewStyle';

const Alert = snackBarAlert;

const useStyles = signupViewStyle

interface SignupViewsProps {
}

const SignupView: React.FC<SignupViewsProps> = () => {

  const classes = useStyles();
  const { dispatch } = useOmangaContex();

  const checkUserIsAdult = () => {
    const inputDate = new Date(dateOfBirth);
    const today = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 18);

    if (inputDate > minAgeDate) {
      setOpenWarningMessage(true);
    }
  };

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [password, setPassword] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState<number>()

  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [dateOfBirthError, setDateOfBirthError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [openSuccessMessage, setOpenSuccessMessage] = React.useState(false);
  const [openErrorMessage, setOpenErrorMessage] = React.useState(false);;
  const [openWarningMessage, setOpenWarningMessage] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    if (firstName === '') { setFirstNameError(true) }
    if (lastName === '') { setLastNameError(true) }
    if (email === '') { setEmailError(true) }
    if (dateOfBirth === '') { setDateOfBirthError(true) }
    if (password === '') { setPasswordError(true) }

    checkUserIsAdult();

    event.preventDefault();
    console.log(firstName, lastName, dateOfBirth, email, password, city, zipCode);
    dispatch({ type: 'SET_USER_IS_LOGGED', userIsLogged: true });
    handleClick('success');
    setTimeout(() => redirect("/"), 2000);
  }

  const handleClick = (e: string) => {
    if (e === 'success') { setOpenSuccessMessage(true) }
    if (e === 'error') { setOpenErrorMessage(true) }
    if (e === 'warning') { setOpenWarningMessage(true) }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string, state?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (state === 'success') {
      setOpenSuccessMessage(false)
    }
    if (state === 'error') {
      setOpenErrorMessage(false)
    }
    if (state === 'warning') {
      setOpenWarningMessage(false)
    }
  };

  return (
    <Grid container className={`${classes.signupView} ${classes.flexCenter}`}>
      <form autoComplete="off" onSubmit={handleSubmit} className={`${classes.signupForm}`}>
        <h2 className={classes.formTitle}>Rejoindre la communauté O'manga </h2>
        <TextField
          type="text"
          variant='outlined'
          color='primary'
          label="Nom"
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
          error={firstNameError}
          fullWidth
          required
          sx={{ mb: 3 }}
        />
        <TextField
          type="text"
          variant='outlined'
          color='primary'
          label="Prénom"
          onChange={e => setLastName(e.target.value)}
          value={lastName}
          error={lastNameError}
          fullWidth
          required
          sx={{ mb: 3 }}
        />
        <TextField
          type="date"
          variant='outlined'
          color='primary'
          label="Date de naissance"
          onChange={e => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
          error={dateOfBirthError}
          fullWidth
          required
          sx={{ mb: 3 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
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
        <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
          <TextField
            type="text"
            variant='outlined'
            color='primary'
            label="Ville"
            onChange={e => setCity(e.target.value)}
            value={city}
            fullWidth
          />
          <TextField
            type="number"
            variant='outlined'
            color='primary'
            label="Code postal"
            onChange={e => setZipCode(parseInt(e.target.value))}
            value={zipCode}
            fullWidth
          />
        </Stack>
        <Grid className={`${classes.submitContainer}`}>
          <Grid item xs={6}>
            <Button variant="outlined" color="primary" type="submit">Nous Rejoindre</Button>
          </Grid>
          <Grid item xs={6} className={`${classes.flexCenter}`}>
            <small>Vous êtes déjà dans la communauté? <Link to="/login">Connectez-vous ici</Link></small>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={openSuccessMessage} autoHideDuration={2000} onClose={(event, reason) => handleClose(event, reason, 'success')}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Merci d'avoir rejoins notre communauté !
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorMessage} autoHideDuration={2000} onClose={(event, reason) => handleClose(event, reason, 'error')}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Un prolème est survenu, veuillez réessayer plus tard.
        </Alert>
      </Snackbar>
      <Snackbar open={openWarningMessage} autoHideDuration={2000} onClose={(event, reason) => handleClose(event, reason, 'warning')}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Votre age ne vous permet pas de vous inscrire !
        </Alert>
      </Snackbar>
    </Grid>

  )
};

export { SignupView };