import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Button, Snackbar, Stack, Grid, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { materialUITheme } from '../../utils/materialUITheme';
import { snackBarAlert } from '../../utils/snackBarAlert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { makeStyles } from '@material-ui/core/styles';

const universesArray = [
  {
    value: 1,
    slug: 'Univers 1'
  },
  {
    value: 2,
    slug: 'Univers 2'
  },
]

const categoriesArray = [
  {
    value: 1,
    slug: 'Categorie 1'
  },
  {
    value: 2,
    slug: 'Categorie 2'
  },
]

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

interface CategoryFormProps {
  row?: any;
  item: string;
  onClose: () => void;
}

const ProductForm: React.FC<CategoryFormProps> = ({ row, item, onClose }) => {
  const classes = useStyles();

  const Alert = snackBarAlert;

  const [openSuccessCreateMessage, setOpenSuccessCreateMessage] =
    useState(false);
  const [openSuccessUpdateMessage, setOpenSuccessUpdateMessage] =
    useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const [productName, setProductName] = useState<string>(row ? row.productName : '');
  const [productNameError, setProductNameError] = useState(false);

  const [productPrice, setProductPrice] = useState<string>(row ? row.price : '');
  const [productPriceError, setProductPriceError] = useState(false);

  const [universSelect, setUniversSelect] = useState<string>(row ? row.universe : '');
  const [universSelectError, setUniversSelectError] = useState(false);

  const [categorySelect, setCategorySelect] = useState<string>(row ? row.category : '');
  const [categorySelectError, setCategorySelectError] = useState(false);

  const [file, setFile] = useState<string | undefined>(undefined);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) throw new Error('no file');
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    setFile(fileUrl);
    console.log(file, 'file');
  };

  const handleChangeUnivers = (event: SelectChangeEvent) => {
    setUniversSelect(event.target.value as string);
  }

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategorySelect(event.target.value as string);
  }

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
      if (productName === row.nameProduct) {
        setProductNameError(true);
      }
      if (productPrice === row.price) {
        setProductPriceError(true);
      }
      if (universSelect === row.univers) {
        setUniversSelectError(true);
      }
      if (categorySelect === row.category) {
        setCategorySelectError(true);
      }
      handleClick('successUpdate');
    }
    if (!row) {
      if (productName === '') {
        setProductNameError(true);
      }
      if (productPrice === '') {
        setProductPriceError(true);
      }
      if (universSelect === '') {
        setUniversSelectError(true);
      }
      if (categorySelect === '') {
        setCategorySelectError(true);
      }
      handleClick('successCreate');
    }

    console.log(productName, productPrice, universSelect, categorySelect);
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
          <h2 className={classes.formTitle}>Univers</h2>
          <TextField
            type='text'
            variant='outlined'
            color='primary'
            label='Univers'
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            defaultValue={row ? row.nameProduct : ''}
            error={productNameError}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <TextField
            type='number'
            variant='outlined'
            color='primary'
            label='Prix'
            onChange={(e) => setProductPrice(e.target.value)}
            value={productPrice}
            defaultValue={row ? row.univers : null}
            error={productPriceError}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <InputLabel id="univers-select">Univers</InputLabel>
          <Select
            labelId="univers-select"
            id="univers-select-disabled"
            value={universSelect}
            label="Univers"
            onChange={handleChangeUnivers}
            error={universSelectError}
            fullWidth
            required
            sx={{ mb: 3 }}
          >
            {
              universesArray.map((item, index) => (
                <MenuItem key={index} value={item.value}>{item.slug}</MenuItem>
              ))
            }
          </Select>
          <InputLabel id="univers-select">Catégorie</InputLabel>
          <Select
            labelId="univers-select"
            id="category-select-disabled"
            value={categorySelect}
            label="Catégorie"
            onChange={handleChangeCategory}
            error={categorySelectError}
            fullWidth
            required
            sx={{ mb: 3 }}
          >
            {
              categoriesArray.map((item, index) => (
                <MenuItem key={index} value={item.value}>{item.slug}</MenuItem>
              ))
            }
          </Select>

          <Stack
            spacing={2}
            direction='row'
            sx={{ mb: 3 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center', marginLeft: '0' }}
          >
            <input
              accept='image/*'
              style={{ display: 'none', marginLeft: '0' }}
              id='image-upload'
              type='file'
              onChange={handleFileChange}
            />
            <label htmlFor='image-upload' style={{ width: '100%', marginLeft: '0' }}>
              <Button
                variant='contained'
                color='primary'
                component='span'
                startIcon={<CloudUploadIcon />}
                style={{ width: '100%', marginLeft: '0' }}
              >
                Joindre la photo
              </Button>
            </label>
          </Stack>
          <Stack spacing={10} direction='row' className={classes.centerButton}>
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
          L'univers a été créée avec succès!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccessUpdateMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, 'success')}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          L'univers a été mis à jour avec succès!
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

export { ProductForm };
