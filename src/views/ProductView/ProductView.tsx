import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { products } from '../ProductsView/products'
import { Product } from '../../models/Product';


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
    justifyContent: 'center',
    flexDirection: 'column'
  },
}));

interface ProductViewProps {
}

const ProductView: React.FC<ProductViewProps> = () => {
  let { id } = useParams();
  const classes = useStyles();
  const product: Product = products[Number(id)];

  return (
    <Grid container className={`${classes.ProductView} ${classes.flexCenter}`}>
      <h1>ProductView</h1>
      <h2>{product.name}</h2>
      <h3>{product.price}</h3>
      <h4>{product.category}</h4>
      <h4>{product.universe}</h4>
    </Grid>

  );
};

export { ProductView };