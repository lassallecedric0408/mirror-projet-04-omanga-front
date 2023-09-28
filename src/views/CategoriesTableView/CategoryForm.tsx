import React, { ChangeEvent, useState } from 'react';
import { TextField, Button, Snackbar, Stack, Grid } from '@mui/material';
import { materialUITheme } from '../../utils/materialUITheme';
import { snackBarAlert } from '../../utils/snackBarAlert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
    justifyContent: 'center',
  },
}));

interface CategoryFormProps {
  row?: any;
  item: string;
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ row, item, onClose }) => {
  const classes = useStyles();

  const Alert = snackBarAlert;

  const [openSuccessCreateMessage, setOpenSuccessCreateMessage] =
    useState(false);
  const [openSuccessUpdateMessage, setOpenSuccessUpdateMessage] =
    useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const [categoryName, setCategoryName] = useState<string>(
    row ? row.category : ''
  );

  const [categoryNameError, setCategoryNameError] = useState(false);

  const [file, setFile] = useState<string | undefined>(undefined);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) throw new Error('no file');
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    setFile(fileUrl);
    console.log(file, 'file');
  };

  const handleClick = (e: string) => {
    if (e === 'successCreate') {
      setOpenSuccessCreateMessage(true);
    }
    if (e === 'successUpdate') {
      setOpenSuccessUpdateMessage(true);
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
    if (state === 'successCreate') {
      setOpenSuccessUpdateMessage(false);
    }
    if (state === 'error') {
      setOpenErrorMessage(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (row) {
      if (categoryName === row.category) {
        setCategoryNameError(true);
      }
      handleClick('successUpdate');
    }
    if (!row) {
      if (categoryName === '') {
        setCategoryNameError(true);
      }
      handleClick('successCreate');
    }
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
          <h2 className={classes.formTitle}>Catégorie</h2>
          <TextField
            type='text'
            variant='outlined'
            color='primary'
            label='Nom Catégorie'
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            error={categoryNameError}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <Stack spacing={2} direction='row' sx={{ mb: 3 }}>
            <input
              accept='image/*'
              style={{ display: 'none' }}
              id='image-upload'
              type='file'
              onChange={handleFileChange}
            />
            <label htmlFor='image-upload'>
              <Button
                variant='contained'
                color='primary'
                component='span'
                startIcon={<CloudUploadIcon />}
              >
                Joindre la photo
              </Button>
            </label>
          </Stack>
          <Stack spacing={10} direction='row'>
            <Button
              variant='outlined'
              color='primary'
              type='submit'
              className={classes.formSubmitButton}
            >
              {row ? 'Mise à jour' : 'Création'}
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
          La catégorie a été créée avec succès!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccessUpdateMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, 'success')}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          La catégorie a été mis à jour avec succès!
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

export { CategoryForm };
