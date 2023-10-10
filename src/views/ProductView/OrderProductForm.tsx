import React, { useState } from 'react';
import {
  Button,
  Snackbar,
  Stack,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
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
  productTitle: {
    color: `${materialUITheme.palette.primary.main}`,
    fontSize: '1.6rem',
    fontFamily: 'Caveat',
  },
  formSubmitButton: { marginTop: '2rem' },
  centerButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

interface OrderProductFormProps {
  row?: any;
  name: string | undefined;
  onClose: () => void;
}

const OrderProductForm: React.FC<OrderProductFormProps> = ({
  row,
  name,
  onClose,
}) => {
  const classes = useStyles();

  const Alert = snackBarAlert;

  const OrderArray = Array.from({ length: 10 }).map((_, index) => ({
    value: index + 1,
    slug: `${index + 1}`,
  }));

  const [openSuccessCreateMessage, setOpenSuccessCreateMessage] =
    useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const [orderProductNumber, setOrderProductNumber] = useState('1');

  const handleOrderProductNumber = (event: SelectChangeEvent) => {
    setOrderProductNumber(event.target.value);
  };

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClick('success');
    console.log(Number(orderProductNumber));
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
          <h2 className={classes.formTitle}>Réservation</h2>
          <Grid container>
            <Grid item xs={6} className={classes.centerText}>
              <h4 className={classes.productTitle}>Produit réservé: {name}</h4>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id='product-number-select'>
                Nombre de produits
              </InputLabel>
              <Select
                labelId='product-number-select'
                id='univers-select-disabled'
                value={orderProductNumber}
                label='Univers'
                onChange={handleOrderProductNumber}
                fullWidth
                required
                sx={{ mb: 3 }}
              >
                {OrderArray.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.slug}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Stack spacing={10} direction='row'></Stack>
          <Stack spacing={10} direction='row' className={classes.centerButton}>
            <Button
              variant='outlined'
              color='primary'
              type='submit'
              className={classes.formSubmitButton}
            >
              Réserver votre produit
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
          Votre réservation est bien enregistrée!
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

export { OrderProductForm };
