import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  productsView: {
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

interface ProductsViewProps {
}

const ProductsView: React.FC<ProductsViewProps> = () => {

  const classes = useStyles();

  return (
    <Grid container className={`${classes.productsView} ${classes.flexCenter}`}>
      <h1>ProductsView</h1>
    </Grid>

  );
};

export { ProductsView };