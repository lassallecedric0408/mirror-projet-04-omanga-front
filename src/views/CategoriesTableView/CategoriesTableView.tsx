import React from 'react';
import Grid from '@material-ui/core/Grid';
import { categoriesTableViewStyles } from './categoriesTableViewStyle';

const useStyles = categoriesTableViewStyles;

interface CategoriesTableViewProps {
}

const CategoriesTableView: React.FC<CategoriesTableViewProps> = () => {

  const classes = useStyles();

  return (
    <Grid container className={`${classes.categoriesTableView} ${classes.flexCenter}`}>
      <h1>CategoriesTableView</h1>
    </Grid>

  );
};

export default CategoriesTableView;