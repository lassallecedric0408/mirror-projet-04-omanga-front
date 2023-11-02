import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { redirect } from 'react-router-dom';

import { getAllProducts } from '../../services/products';
import { getAllUniverses } from '../../services/universes';
import { getAllCategories } from '../../services/categories';
import { MultipleSelect } from '../../components/multipleSelect';
import { SingleSelect } from '../../components/singleSelect';
import { ProductCard } from '../../components/productCard';
import { productsItemsSelect } from './productItemsSelect';

import { CircularProgress, Grid, Typography, Stack } from '@mui/material';

const ProductsView: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getAllProducts'],
    queryFn: () => getAllProducts(),
  });
  const categories = useQuery({
    queryKey: ['getAllCategories'],
    queryFn: () => getAllCategories(),
  });
  const universes = useQuery({
    queryKey: ['getAllUniverses'],
    queryFn: () => getAllUniverses(),
  });

  const productsData = data?.data || [];
  const categoriesSelect = categories?.data
    ? categories.data.data.map((category) => category.name)
    : [];
  const universesSelect = universes?.data
    ? universes.data.data.map((universe) => universe.name)
    : [];
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
    return (
      <div
        style={{
          height: '77vh',
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    redirect('/error');
  }

  return (
    <Stack
      sx={{
        height: '77vh',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid item xs={12} sm={12} md={12} sx={{ margin: '1rem 0 1rem 0' }}>
        <Typography variant='h5' color='primary'>
          Découvrer les articles dans notre boutique
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ marginBottom: '3rem', flex: '0' }}>
        <Grid item xs={4}>
          <MultipleSelect
            selectItems={categoriesSelect}
            selectName={'Catégories'}
            onChange={handleCategoriesChange}
          />
        </Grid>
        <Grid item xs={4}>
          <MultipleSelect
            selectItems={universesSelect}
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
      <Grid
        container
        spacing={3}
        sx={{
          flex: '1',
          overflowY: 'auto',
          maxHeight: '100%',
          marginBottom: '1rem',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {AllProducts.map((product, index) => {
          return (
            <Grid item xs={12} sm={6} md={2}>
              <ProductCard
                key={index}
                index={product.id}
                name={product.name}
                price={product.price}
                imageLink={product.image_url}
              />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export { ProductsView };
