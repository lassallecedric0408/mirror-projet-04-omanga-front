import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Button, Snackbar, Stack } from '@mui/material';
import { snackBarAlert } from '../../utils/snackBarAlert';
import { useOmangaContex } from '../../context/OmangaContext';

import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const Alert = snackBarAlert;

interface ViewsProps {}

const useStyles = makeStyles((theme) => ({
  signupView: {
    height: '70vh',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  signupForm: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    color: `${materialUITheme.palette.primary.main}`,
    paddingBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '0rem',
      fontSize: '1rem',
    },
  },
  submitContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const AccountInformtions: React.FC<ViewsProps> = () => {
  const classes = useStyles();
  const { dispatch, OmangaState } = useOmangaContex();
  const { user } = OmangaState;

  const [firstName, setFirstName] = useState(user?.user?.firstname ?? '');
  const [lastName, setLastName] = useState(user?.user?.lastname ?? '');
  const [email, setEmail] = useState(user?.user?.email ?? '');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [city, setCity] = useState(user?.user?.city ?? '');
  const [zipCode, setZipCode] = useState(user?.user?.zip_code ?? 0);

  const [openSuccessMessage, setOpenSuccessMessage] = React.useState(false);
  const [openErrorMessage, setOpenErrorMessage] = React.useState(false);

  const [enableInput, setEnableInput] = useState(true);
  const handleToogleInput = () => {
    setEnableInput(!enableInput);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(firstName, lastName, dateOfBirth, email, city, zipCode);
    handleClick('success');
  };

  const handleClick = (e: string) => {
    if (e === 'success') {
      setOpenSuccessMessage(true);
    }
    if (e === 'error') {
      setOpenErrorMessage(true);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
    state?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    if (state === 'success') {
      setOpenSuccessMessage(false);
    }
    if (state === 'error') {
      setOpenErrorMessage(false);
    }
  };

  return (
    <Grid container className={`${classes.signupView} ${classes.flexCenter}`}>
      <form
        autoComplete='off'
        onSubmit={handleSubmit}
        className={`${classes.signupForm}`}
      >
        <TextField
          type='text'
          variant='outlined'
          color='primary'
          label='Nom'
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          fullWidth
          required
          disabled={enableInput}
          sx={{ mb: 3 }}
        />
        <TextField
          type='text'
          variant='outlined'
          color='primary'
          label='Prénom'
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          fullWidth
          required
          disabled={enableInput}
          sx={{ mb: 3 }}
        />
        <TextField
          type='date'
          variant='outlined'
          color='primary'
          label='Date de naissance'
          onChange={(e) => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
          fullWidth
          required
          disabled={enableInput}
          sx={{ mb: 3 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type='email'
          variant='outlined'
          color='primary'
          label='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          disabled={enableInput}
          required
          sx={{ mb: 3 }}
        />
        <Stack spacing={2} direction='row' sx={{ mb: 3 }}>
          <TextField
            type='text'
            variant='outlined'
            color='primary'
            label='Ville'
            onChange={(e) => setCity(e.target.value)}
            value={city}
            fullWidth
            disabled={enableInput}
          />
          <TextField
            type='number'
            variant='outlined'
            color='primary'
            label='Code postal'
            onChange={(e) => setZipCode(parseInt(e.target.value))}
            value={zipCode}
            fullWidth
            disabled={enableInput}
          />
        </Stack>
        <Grid className={`${classes.submitContainer}`}>
          {enableInput ? (
            <Grid item xs={6}>
              <Button
                variant='outlined'
                color='primary'
                type='button'
                onClick={handleToogleInput}
              >
                Mettre votre profil jour
              </Button>
            </Grid>
          ) : (
            <>
              <Grid item xs={6}>
                <Button variant='outlined' color='primary' type='submit'>
                  Soumettre
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant='outlined'
                  color='primary'
                  type='button'
                  onClick={handleToogleInput}
                >
                  Annuler
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </form>
      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, 'success')}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Votre profil a bien été mis à jour !
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, 'error')}
      >
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          Un prolème est survenu, veuillez réessayer plus tard.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export { AccountInformtions };
