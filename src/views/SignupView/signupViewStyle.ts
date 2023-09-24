import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const signupViewStyle = makeStyles((theme) => ({
  signupView: {
    height: '77vh',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  signupForm: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    color: `${materialUITheme.palette.primary.main}`,
    paddingBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '0rem',
      fontSize: '1rem',
    },
  },
  submitContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export { signupViewStyle };
