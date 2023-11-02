import React, { useState } from 'react';
import useAuthStore from '../../states/OmangaStore';
import { useMutation } from 'react-query';
import {
  TextField,
  Button,
  Snackbar,
  Stack,
  Grid,
  CircularProgress,
  Typography,
} from '@mui/material';
import { snackBarAlert } from '../../utils/snackBarAlert';

import { createOneReview } from '../../services/reviews';
import { resetPassword } from '../../services/password';

type AddReviewFormProps = {
  onClose: () => void;
};

const ResetPasswordForm: React.FC<AddReviewFormProps> = ({ onClose }) => {
  const user = useAuthStore((state) => state.user);

  const Alert = snackBarAlert;

  const [openSuccessCreateMessage, setOpenSuccessCreateMessage] =
    useState(false);

  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const [openWarningMessage, setOpenWarningMessage] = useState(false);

  const [password, setPassWord] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  const userMail = user.user.email;

  const handleClick = (e: string) => {
    if (e === 'success') {
      setOpenSuccessCreateMessage(true);
    }
    if (e === 'warning') {
      setOpenWarningMessage(true);
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
      setOpenSuccessCreateMessage(false);
    }
    if (state === 'warning') {
      setOpenWarningMessage(false);
    }
    if (state === 'error') {
      setOpenErrorMessage(false);
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: ['reset-password', { userMail, password }],
    mutationFn: () => resetPassword(userMail, password),
    onSettled: (data, error) => {
      if (error) {
        handleClick('error');
      }
      if (data) {
        handleClick('success');
        setTimeout(onClose, 2500);
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === controlPassword) {
      mutate();
    } else {
      handleClick('warning');
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
      <Grid
        container
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <form
          autoComplete='off'
          onSubmit={handleSubmit}
          style={{ width: '80%' }}
        >
          <Typography variant='h5' color='primary' gutterBottom>
            Mettre à jour votre mot de passe
          </Typography>
          <TextField
            type='password'
            variant='outlined'
            color='primary'
            label='Votre mot de passe'
            onChange={(e) => setPassWord(e.target.value)}
            value={password}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <TextField
            type='password'
            variant='outlined'
            color='primary'
            label='Contrôle du mot de passe'
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <Stack
            spacing={10}
            direction='row'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant='outlined'
              color='primary'
              type='submit'
              sx={{ mt: '2rem' }}
            >
              Envoyer votre mot de passe
            </Button>
            <Button variant='outlined' onClick={onClose}>
              Annuler
            </Button>
          </Stack>
        </form>
      </Grid>

      <Snackbar
        open={openSuccessCreateMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, 'success')}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Votre avis a bien été ajouté!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openWarningMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, 'warning')}
      >
        <Alert onClose={handleClose} severity='warning' sx={{ width: '100%' }}>
          Les mots de passe ne sont pas identiques!
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
    </>
  );
};

export { ResetPasswordForm };
