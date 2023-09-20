import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  aboutUsView: {
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

interface AboutUsViewsProps {
}

const AboutUsView: React.FC<AboutUsViewsProps> = () => {

  const classes = useStyles();

  return (
    <Grid container className={`${classes.aboutUsView} ${classes.flexCenter}`}>
      <h1>AboutUsView</h1>
    </Grid>

  );
};

export { AboutUsView };