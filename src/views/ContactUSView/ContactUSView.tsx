import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  contactUSView: {
    height: '77vh',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));

interface ContactUSViewsProps {
}

const ContactUSView: React.FC<ContactUSViewsProps> = () => {

  const classes = useStyles();

  return (
    <Grid container className={`${classes.contactUSView} ${classes.flexCenter}`}>
      <h1>ContactUSView</h1>
    </Grid>

  );
};

export { ContactUSView };