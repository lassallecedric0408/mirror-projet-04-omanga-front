import React from 'react';
import { Stack, Paper } from '@mui/material';
import construction from '../../assets/under-construction.jpg'
import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  preference: {
    height: 'vh',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorTitle: {
    fontSize: '2rem',
    color: `${materialUITheme.palette.primary.main}`,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
    },
  },
}));

interface ViewsProps {
}

const Preference: React.FC<ViewsProps> = () => {

  const classes = useStyles();

  return (
    <Stack className={`${classes.preference} ${classes.flexCenter}`}>
      <p className={classes.errorTitle}> En construction !
      </p>
      <img src={construction} alt="Under contruction" style={{ width: '40%' }} />
    </Stack>
  );
};

export { Preference };