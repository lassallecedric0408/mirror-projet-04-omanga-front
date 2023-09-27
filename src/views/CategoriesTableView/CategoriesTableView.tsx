import React from 'react';
import Grid from '@material-ui/core/Grid';
import { categoriesTableViewStyle } from './categoriesTableViewStyle';

const useStyles = categoriesTableViewStyle;

interface CategoriesTableViewProps {
}

const CategoriesTableView: React.FC<CategoriesTableViewProps> = () => {

  const classes = useStyles();

  return (
    <Grid container>
      <h1>CategoriesTableView</h1>
    </Grid>

  );
};

export { CategoriesTableView };