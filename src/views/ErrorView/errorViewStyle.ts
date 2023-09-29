import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const viewStyles = makeStyles((theme) => ({
  view: {
    height: '77vh',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export { viewStyles };
