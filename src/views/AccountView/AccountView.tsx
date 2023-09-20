import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  accountView: {
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

interface AccountViewsProps {
}

const AccountView: React.FC<AccountViewsProps> = () => {

  const classes = useStyles();

  return (
    <Grid container className={`${classes.accountView} ${classes.flexCenter}`}>
      <h1>AccountView</h1>
    </Grid>

  );
};

export { AccountView };