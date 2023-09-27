import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Stack, Button, Snackbar, Alert } from "@mui/material";
import { materialUITheme } from '../../utils/materialUITheme';
import { snackBarAlert } from '../../utils/snackBarAlert';

const useStyles = makeStyles((theme) => ({
  deleteRawTable: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  deleteRawTableTitle: {
    color: `${materialUITheme.palette.primary.main}`,
    fontSize: '1.6rem',
    marginBottom: '2rem',
  },
}));

interface DeleteRawTableProps {
  rowId: number;
  item: string;
  onClose: () => void;
}

const DeleteRawTable: React.FC<DeleteRawTableProps> = ({ rowId, item, onClose }) => {

  const classes = useStyles();

  const Alert = snackBarAlert;

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const handleClick = (e: string) => {
    if (e === 'success') { setOpenSuccessMessage(true) }
    if (e === 'error') { setOpenErrorMessage(true) }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string, state?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (state === 'success') {
      setOpenSuccessMessage(false)
    }
    if (state === 'error') { setOpenErrorMessage(false) }
  };

  const HandleDeleteRow = () => {
    console.log(rowId);
    handleClick('success');
    setTimeout(onClose, 2000)
  }

  return (
    <>

      <Grid container className={classes.deleteRawTable}>
        <Grid item>
          <h2 className={classes.deleteRawTableTitle}>Voulez-vous supprimer {item}</h2>
        </Grid>
        <Stack spacing={10} direction="row">
          <Button variant="contained" onClick={HandleDeleteRow}>Supprimer</Button>
          <Button variant="outlined" onClick={onClose}>Annuler</Button>
        </Stack>
      </Grid>

      <Snackbar open={openSuccessMessage} autoHideDuration={2000} onClose={(event, reason) => handleClose(event, reason, 'success')}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          La réservation a bien été supprimé!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorMessage} autoHideDuration={2000} onClose={(event, reason) => handleClose(event, reason, 'error')}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Une erreur s'est produit. Veuillez essayer à nouveau!
        </Alert>
      </Snackbar>
    </>
  );
};

export { DeleteRawTable };