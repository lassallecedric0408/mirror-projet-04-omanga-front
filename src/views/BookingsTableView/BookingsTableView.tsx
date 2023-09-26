import React from 'react';
import Grid from '@material-ui/core/Grid';
import { bookingsTableViewStyle } from './bookingsTableViewStyle';

const useStyles = bookingsTableViewStyle;

interface BookingsTableViewProps {
}

const BookingsTableView: React.FC<BookingsTableViewProps> = () => {

  const classes = useStyles();

  return (
    <Grid container className={`${classes.view} ${classes.flexCenter}`}>
      <h1>BookingsTableView</h1>
    </Grid>

  );
};

export { BookingsTableView };