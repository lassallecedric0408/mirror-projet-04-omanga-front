import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { redirect } from 'react-router-dom';

import { productsViewStyle } from './productsViewStyle';
import { MultipleSelect } from '../../components/multipleSelect';
import { SingleSelect } from '../../components/singleSelect';
import { ProductCard } from '../../components/productCard';
import { productsItemsSelect } from './productItemsSelect';

import Grid from '@material-ui/core/Grid';
import { getAllProducts } from '../../services/products';
import { CircularProgress } from '@mui/material';

const useStyles = productsViewStyle;

const categories = ['Statuette', 'Arme', 'Livre', 'Carte'];

const universe = ['Japon1', 'Japon2', 'Japon3', 'Japon4'];

interface ProductsViewProps {}

const ProductsView: React.FC<ProductsViewProps> = () => {
  const classes = useStyles();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getAllProducts'],
    queryFn: () => getAllProducts(),
  });

  const productsData = data?.data || [];

  const [productsSelectCategories, setProductsSelectCategories] = useState<
    string[]
  >([]);
  const [productsSelectUniverses, setProductsSelectUniverses] = useState<
    string[]
  >([]);
  const [productsSort, setProductsSort] = useState<string>('');

  const getFitleredProducts = () => {
    let filteredProducts = [...productsData];
    if (productsSelectCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        productsSelectCategories.includes(product.category.name)
      );
    }
    if (productsSelectUniverses.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        productsSelectUniverses.includes(product.universe.name)
      );
    }
    // if (productsSort === 'date') {
    //   filteredProducts = filteredProducts.sort((a, b) => {
    //     return b.product_creation_date - a.product_creation_date;
    //   });
    // }
    if (productsSort === 'risingPrice') {
      filteredProducts = filteredProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (productsSort === 'decreasingPrice') {
      filteredProducts = filteredProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    return filteredProducts;
  };

  const AllProducts = getFitleredProducts();

  const handleCategoriesChange = (value: string[]) => {
    setProductsSelectCategories(value);
  };
  const handleUniversChange = (value: string[]) => {
    setProductsSelectUniverses(value);
  };
  const handleSortChange = (value: string) => {
    setProductsSort(value);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    redirect('/error');
  }

  return (
    <Grid container className={`${classes.productsView}`}>
      <Grid
        item
        className={`${classes.productTitle} ${classes.flexVertCenter}`}
      >
        <p> Découvrer les articles dans notre boutique</p>
      </Grid>
      <Grid container spacing={2} className={`${classes.productSelect}`}>
        <Grid item xs={4}>
          <MultipleSelect
            selectItems={categories}
            selectName={'Catégories'}
            onChange={handleCategoriesChange}
          />
        </Grid>
        <Grid item xs={4}>
          <MultipleSelect
            selectItems={universe}
            selectName={'Univers'}
            onChange={handleUniversChange}
          />
        </Grid>
        <Grid item xs={4}>
          <SingleSelect
            selectItems={productsItemsSelect}
            selectName={'Trier par'}
            onChange={handleSortChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.productItems}>
        {AllProducts.map((product, index) => {
          return (
            <Grid item xs={12} sm={6} md={2}>
              <ProductCard
                index={index}
                name={product.name}
                price={product.price}
                imageLink={product.image_url}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export { ProductsView };
