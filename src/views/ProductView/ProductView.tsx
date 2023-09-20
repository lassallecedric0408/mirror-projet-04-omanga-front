import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  ProductView: {
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

interface ProductViewProps {
}

const ProductView: React.FC<ProductViewProps> = () => {

  const classes = useStyles();

  return (
    <Grid container className={`${classes.ProductView} ${classes.flexCenter}`}>
      <h1>ProductView</h1>
    </Grid>

  );
};

export { ProductView };