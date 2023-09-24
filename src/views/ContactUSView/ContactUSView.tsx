import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, FormControl, Button, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { contactUSViewStyle } from './contactUSViewStyle';

const useStyles = contactUSViewStyle

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ContactUSViewsProps {
}

const ContactUSView: React.FC<ContactUSViewsProps> = () => {

  const classes = useStyles();
  const form = useRef<HTMLFormElement | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setCommentError(false);

    if (firstName === '') {
      handleClick('success')
      setFirstNameError(true)
    }
    if (lastName === '') {
      setLastNameError(true)
      handleClick('error')
    }
    if (email === '') {
      setEmailError(true)
      handleClick('error')
    }
    if (comment === '') {
      setCommentError(true)
      handleClick('error')
    }

    if (firstName && lastName && email && comment) {
      console.log(firstName, lastName, email, comment);
      setFirstName('');
      setLastName('');
      setEmail('');
      setComment('');
      handleClick('success')
    }
  }

  const [openSuccessMessage, setOpenSuccessMessage] = React.useState(false);
  const [openErrorMessage, setOpenErrorMessage] = React.useState(false);

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

  return (
    <>
      <Grid container className={`${classes.contactUSView} ${classes.flexCenter}`}>
        <form autoComplete="off" onSubmit={handleSubmit} ref={form}>
          <h2 className={classes.formTitle}>Un besoin particulier. Contactez - nous</h2>
          <TextField
            label="Nom"
            onChange={e => setLastName(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={lastName}
            error={lastNameError}
          />
          <TextField
            label="Prenom"
            onChange={e => setFirstName(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="text"
            value={firstName}
            error={firstNameError}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Mail"
            onChange={e => setEmail(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="email"
            sx={{ mb: 3 }}
            fullWidth
            value={email}
            error={emailError}
          />
          <TextField
            label="Commentaire"
            onChange={e => setComment(e.target.value)}
            multiline
            rows={6}
            required
            variant="outlined"
            color="primary"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={comment}
            error={commentError}
          />
          <Button variant="outlined" color="primary" type="submit">Envoyez votre message</Button>
        </form>
      </Grid>
      <Snackbar open={openSuccessMessage} autoHideDuration={2000} onClose={(event, reason) => handleClose(event, reason, 'success')}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Le message a bien été envoyé !
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorMessage} autoHideDuration={2000} onClose={(event, reason) => handleClose(event, reason, 'error')}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          La demande n'a pas pu être envoyée !
        </Alert>
      </Snackbar>
    </>

  );
};

export { ContactUSView };