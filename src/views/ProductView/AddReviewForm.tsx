import React, { useState } from 'react';
import { TextField, Button, Snackbar, Stack, Grid } from '@mui/material';
import { materialUITheme } from '../../utils/materialUITheme';
import { snackBarAlert } from '../../utils/snackBarAlert';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  formTitle: {
    color: `${materialUITheme.palette.primary.main}`,
    fontSize: '1.6rem',
    marginBottom: '2rem',
  },
  formSubmitButton: { marginTop: '2rem' },
  centerButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

interface AddReviewFormProps {
  onClose: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ onClose }) => {
  const classes = useStyles();

  const Alert = snackBarAlert;

  const [openSuccessCreateMessage, setOpenSuccessCreateMessage] =
    useState(false);

  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  const [comment, setComment] = useState('');

  const handleClick = (e: string) => {
    if (e === 'successCreate') {
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
    if (state === 'successCreate') {
      setOpenSuccessCreateMessage(false);
    }
    if (state === 'error') {
      setOpenErrorMessage(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClick('successCreate');
    console.log(comment);
    setTimeout(onClose, 2000);
  };

  return (
    <>
      <Grid container className={classes.form}>
        <form
          autoComplete='off'
          onSubmit={handleSubmit}
          style={{ width: '80%' }}
        >
          <h2 className={classes.formTitle}>Votre avis nous intéresse</h2>
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
          <Stack spacing={10} direction='row' className={classes.centerButton}>
            <Button
              variant='outlined'
              color='primary'
              type='submit'
              className={classes.formSubmitButton}
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
