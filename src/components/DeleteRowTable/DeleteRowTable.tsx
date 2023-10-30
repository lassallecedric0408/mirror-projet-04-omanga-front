import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Stack, Button, Snackbar, CircularProgress, Grid } from '@mui/material';
import { materialUITheme } from '../../utils/materialUITheme';
import { snackBarAlert } from '../../utils/snackBarAlert';
import { deleteOneBooking } from '../../services/bookings';

interface DeleteRawTableProps {
  rowId: number;
  item: string;
  onClose: () => void;
  deleteRow: (id: number) => Promise<any>;
  userMail: string;
}

const DeleteRawTable: React.FC<DeleteRawTableProps> = ({
  rowId,
  item,
  onClose,
  deleteRow,
  userMail,
}) => {
  const Alert = snackBarAlert;

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

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

  const { mutate, isLoading, isError, data } = useMutation({
    mutationKey: ['deleteRow', { rowId, userMail }],
    mutationFn: () => deleteOneBooking(rowId, rowId, userMail),
  });

  const HandleDeleteRow = async () => {
    await mutate();
    if (data) {
      handleClick('success');
      setTimeout(() => onClose, 2500);
    }
    if (isError) {
      handleClick('error');
    }
  };
  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
        <Grid item>
          <h2
            style={{
              color: `${materialUITheme.palette.primary.main}`,
              fontSize: '1.6rem',
              marginBottom: '2rem',
            }}
          >
            Voulez-vous supprimer {item}
          </h2>
        </Grid>
        <Stack spacing={10} direction='row'>
          <Button variant='contained' onClick={HandleDeleteRow}>
            Supprimer
          </Button>
          <Button variant='outlined' onClick={onClose}>
            Annuler
          </Button>
        </Stack>
      </Grid>

      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(event, reason, 'success')}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {capitalizeFirstLetter(item)} a bien été supprimé!
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

export { DeleteRawTable };
