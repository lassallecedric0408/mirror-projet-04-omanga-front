import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import useAuthStore from '../../states/OmangaStore';

import { useMutation } from 'react-query';
import { updateUser } from '../../services/user';

import {
  TextField,
  Button,
  Snackbar,
  Stack,
  Grid,
  CircularProgress,
  Typography,
  Switch,
} from '@mui/material';
import { snackBarAlert } from '../../utils/snackBarAlert';
import { ModalTable } from '../../components/ModalTable';
import { ResetPasswordForm } from './ResetPasswordForm';

const Alert = snackBarAlert;

const AccountInformtions: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const isLogged = useAuthStore((state) => state.isLogged);

  const [firstName, setFirstName] = useState(user?.user?.firstname ?? '');
  const [lastName, setLastName] = useState(user?.user?.lastname ?? '');
  const [email, setEmail] = useState(user?.user?.email ?? '');
  const [city, setCity] = useState(user?.user?.city ?? '');
  const [zipCode, setZipCode] = useState(user?.user?.zip_code ?? 0);

  const [openSuccessMessage, setOpenSuccessMessage] = React.useState(false);
  const [openErrorMessage, setOpenErrorMessage] = React.useState(false);

  const [enableInput, setEnableInput] = useState(true);
  const [checked, setChecked] = React.useState(false);

  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const handleOpenResetPasswordModal = () => setOpenResetPasswordModal(true);
  const handleCloseResetPasswordModal = () => setOpenResetPasswordModal(false);

  const handleToogleInput = () => {
    setChecked(!checked);
    setEnableInput(!enableInput);
  };

  const handleInitInput = () => {
    setFirstName(user?.user?.firstname ?? '');
    setLastName(user?.user?.lastname ?? '');
    setEmail(user?.user?.email ?? '');
    setCity(user?.user?.city ?? '');
    setZipCode(user?.user?.zip_code ?? 0);
    setEnableInput(!enableInput);
    setChecked(!checked);
  };

  const id = user?.user?.id ?? 0;

  const { mutate, isLoading } = useMutation({
    mutationKey: [
      'signupUser',
      { firstName, lastName, email, city, zipCode, id },
    ],
    mutationFn: () =>
      updateUser({
        firstName,
        lastName,
        email,
        city,
        zipCode,
        id,
      }),
    onSettled: (data, error) => {
      if (data) {
        useAuthStore
          .getState()
          .updateUser(
            data.data.result.firstname,
            data.data.result.lastname,
            data.data.result.email,
            data.data.result.image_url,
            data.data.result.role,
            data.data.result.city,
            data.data.result.zip_code
          );
        handleClick('success');
        handleToogleInput();
      }
      if (error) {
        handleClick('error');
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutate();
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

  if (!isLogged) {
    redirect('/');
  }

  return (
    <>
      <Stack
        sx={{
          height: '70vh',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container sx={{ width: '80%', ml: 'auto', mr: 'auto', mb: 3 }}>
          <Grid item xs={6}>
            <Typography
              gutterBottom
              color='primary'
              sx={{
                typography: {
                  lg: 'h5',
                  md: 'h6',
                  sm: 'body1',
                  xs: 'body1',
                },
              }}
            >
              Mettre à jour mes informations
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Switch
              color='primary'
              checked={checked}
              onChange={handleToogleInput}
            />
          </Grid>
          <Grid item xs={4}>
            <Button onClick={handleOpenResetPasswordModal}>
              Changer de mot de passe
            </Button>
          </Grid>
        </Grid>

        <form
          autoComplete='off'
          onSubmit={handleSubmit}
          style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <TextField
            type='text'
            variant='outlined'
            color='primary'
            label='Nom'
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            defaultValue={user?.user?.firstname ?? ''}
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
          <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item xs={6}>
              <Button
                variant='outlined'
                color='primary'
                type='submit'
                disabled={enableInput}
              >
                Envoyer
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant='outlined'
                color='primary'
                type='button'
                onClick={handleInitInput}
                disabled={enableInput}
              >
                Annuler
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={openSuccessMessage}
          autoHideDuration={2000}
          onClose={(event, reason) => handleClose(event, reason, 'success')}
        >
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
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
      </Stack>
      <ModalTable
        open={openResetPasswordModal}
        handleClose={handleCloseResetPasswordModal}
      >
        <ResetPasswordForm onClose={handleCloseResetPasswordModal} />
      </ModalTable>
    </>
  );
};

export { AccountInformtions };
