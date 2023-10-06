import React from 'react';
import { Stack, Paper } from '@mui/material';
import error from '../../assets/error.jpg';
import { viewStyles } from './errorViewStyle';
import { styled } from '@mui/material/styles';

const useStyles = viewStyles;

interface ErrorViewProps {}

const ErrorView: React.FC<ErrorViewProps> = () => {
  const classes = useStyles();

  return (
    <Stack className={`${classes.view} ${classes.flexCenter}`}>
      <p className={classes.errorTitle}> Désolé une erreur c'est produite !</p>
      <img src={error} alt='Error' style={{ width: '80%' }} />
    </Stack>
  );
};

export { ErrorView };
