import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const footerStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: `${materialUITheme.palette.primary.main}`,
    color: theme.palette.primary.contrastText,
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '15vh',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hideOnMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export { footerStyle };
