import React from 'react';
import Grid from '@material-ui/core/Grid';
import { universesTableViewStyle } from './universesTableViewStyle';

const useStyles = universesTableViewStyle;

interface UniversesTableViewProps {
}

const UniversesTableView: React.FC<UniversesTableViewProps> = () => {

  const classes = useStyles();

  return (
    <Grid container className={`${classes.view} ${classes.flexCenter}`}>
      <h1>UniversesTableView</h1>
    </Grid>

  );
};

export { UniversesTableView };