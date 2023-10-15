import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { loginViewStyle } from './loginViewStyle';
import {
  TextField,
  Button,
  Snackbar,
  Grid,
  CircularProgress,
} from '@mui/material';
import { snackBarAlert } from '../../utils/snackBarAlert';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useOmangaContex } from '../../context/OmangaContext';
import { loginUser } from '../../services/user';

const useStyles = loginViewStyle;

interface LoginViewsProps {}

const LoginView: React.FC<LoginViewsProps> = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { dispatch } = useOmangaContex();

  const Alert = snackBarAlert;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectUser, setRedirectUser] = useState(false);

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const { mutate, data, isLoading } = useMutation({
    mutationKey: ['loginUser', { email, password }],
    mutationFn: () =>
      loginUser({
        email,
        password,
      }),
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await mutate();
    console.log(data);
    if (data?.data.user) {
      await dispatch({
        type: 'SET_LOGGED_USER',
        id: data.data.user.id,
        firstname: data.data.user.firstname,
        lastname: data.data.user.lastname,
        email: data.data.user.email,
        image_url: data.data.user.image_url,
        role: data.data.user.role,
        city: data.data.user.city,
        zip_code: data.data.user.zip_code,
      });
      await localStorage.setItem('userIsLogged', 'true');
      await localStorage.setItem(
        `accessToken/${data.data.user.email}`,
        `${data.data.accessToken}`
      );
      await localStorage.setItem(
        `refreshToken/${data.data.user.email}`,
        `${data.data.refreshToken}`
      );
      await handleClick('success');
      setTimeout(() => navigate(`/`), 2500);
    }
    if (!data?.data.user) {
      await handleClick('error');
    }
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

  if (isLoading) {
    return (
      <div
        style={{
          height: '77vh',
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Grid container className={`${classes.loginView} ${classes.flexCenter}`}>
        <form
          autoComplete='off'
          onSubmit={handleSubmit}
          className={`${classes.loginViewForm}`}
        >
          <h2 className={classes.formTitle}>
            Connectez vous à la communauté O'manga{' '}
          </h2>
          <TextField
            type='email'
            variant='outlined'
            color='primary'
            label='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <TextField
            type='password'
            variant='outlined'
            color='primary'
            label='Mot de passe'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            fullWidth
            sx={{ mb: 3 }}
          />
          <Grid className={`${classes.submitContainer}`}>
            <Grid item xs={6}>
              <Button variant='outlined' color='primary' type='submit'>
                Connexion
              </Button>
            </Grid>
            <Grid item xs={6} className={`${classes.flexCenter}`}>
              <small>
                Pas encore de compte?{' '}
                <Link to='/signup'>Inscrivez-vous ici</Link>
              </small>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, 'success')}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          La connexion est validée. Ravis de vous revoir!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, 'error')}
      >
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          Une erreur s'est produit. Veuillez essayer à nouveau!
        </Alert>
      </Snackbar>
      {redirectUser && <Navigate to='/' />}
    </>
  );
};

export { LoginView };
