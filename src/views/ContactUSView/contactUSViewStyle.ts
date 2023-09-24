import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const contactUSViewStyle = makeStyles((theme) => ({
  contactUSView: {
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
  formTitle: {
    color: `${materialUITheme.palette.primary.main}`,
    paddingBottom: '2rem',
  },
}));

export { contactUSViewStyle };
