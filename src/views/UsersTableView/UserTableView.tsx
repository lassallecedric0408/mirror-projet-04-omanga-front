import React from 'react';
import Grid from '@material-ui/core/Grid';
import { usersTableViewStyle } from './userTableViewStyle';

const useStyles = usersTableViewStyle;

interface UsersTableViewProps {
}

const UsersTableView: React.FC<UsersTableViewProps> = () => {

  const classes = useStyles();

  return (
    <Grid container className={`${classes.userTableView} ${classes.flexCenter}`}>
      <h1>UsersTableView</h1>
    </Grid>

  );
};

export { UsersTableView };