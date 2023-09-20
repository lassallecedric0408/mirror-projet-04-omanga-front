import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  HomeView: {
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

interface HomeViewProps {
}

const HomeView: React.FC<HomeViewProps> = () => {

  const classes = useStyles();

  return (
    <Grid container className={`${classes.HomeView} ${classes.flexCenter}`}>
      <h1>HomeView</h1>
    </Grid>
  );
};

export { HomeView };