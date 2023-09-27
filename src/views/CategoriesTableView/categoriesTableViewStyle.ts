import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const categoriesTableViewStyle = makeStyles((theme) => ({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexVertCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    height: '7vh',
    fontSize: '1.6rem',
    color: `${materialUITheme.palette.primary.main}`,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  selectContainer: {
    marginTop: '3rem',
    marginBottom: '1rem',
    width: '100%',
    flex: '0',
  },
  tableContainer: {
    width: '100%',
    flex: '1',
    overflowY: 'auto',
    maxHeight: '100%',
    marginBottom: '1rem',
  },
}));

export { categoriesTableViewStyle };
