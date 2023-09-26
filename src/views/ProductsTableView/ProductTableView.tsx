import React from 'react';
import Grid from '@material-ui/core/Grid';
import { productsTableViewStyle } from './productsTableViewStyle';

const useStyles = productsTableViewStyle;

interface ProductsTableViewProps {
}

const ProductsTableView: React.FC<ProductsTableViewProps> = () => {

  const classes = useStyles();

  return (
    <Grid container className={`${classes.productsTableView} ${classes.flexCenter}`}>
      <h1>ProductTableView</h1>
    </Grid>

  );
};

export { ProductsTableView };