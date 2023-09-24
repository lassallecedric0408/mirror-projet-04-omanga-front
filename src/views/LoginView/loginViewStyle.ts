import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const loginViewStyle = makeStyles((theme) => ({
  loginView: {
    height: '77vh',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loginViewForm: {
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
  },
  submitContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export { loginViewStyle };
