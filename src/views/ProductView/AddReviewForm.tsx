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

type AddReviewFormProps = {
  onClose: () => void;
  id: string | undefined;
};

const AddReviewForm: React.FC<AddReviewFormProps> = ({ onClose, id }) => {
  const user = useAuthStore((state) => state.user);

  const Alert = snackBarAlert;

  const [openSuccessCreateMessage, setOpenSuccessCreateMessage] =
    useState(false);

  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  const [comment, setComment] = useState('');

  const productId = Number(id);
  const userId = user.user.id;
  const userMail = user.user.email;

  const handleClick = (e: string) => {
    if (e === 'success') {
      setOpenSuccessCreateMessage(true);
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
    if (state === 'error') {
      setOpenErrorMessage(false);
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: ['loginUser', { comment, productId, userId, userMail }],
    mutationFn: () =>
      createOneReview({
        comment,
        productId,
        userId,
        userMail,
      }),
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
    mutate();
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
            Votre avis nous intéresse
          </Typography>
          <TextField
            type='text'
            variant='outlined'
            color='primary'
            label='Votre Avis'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            fullWidth
            required
            multiline
            rows={6}
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
              Envoyer votre avis
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

export { AddReviewForm };
