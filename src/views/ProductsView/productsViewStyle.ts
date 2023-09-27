import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const productsViewStyle = makeStyles((theme) => ({
  productsView: {
    height: '77vh',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexVertCenter: {
    alignItems: 'center',
  },
  productTitle: {
    marginTop: '1rem',
    marginBottom: '1rem',
    fontSize: '1.6rem',
    flex: '0',
    color: `${materialUITheme.palette.primary.main}`,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  productSelect: {
    marginTop: '1rem',
    marginBottom: '3rem',
    flex: '0',
  },
  productItems: {
    flex: '1',
    overflowY: 'auto',
    maxHeight: '100%',
    marginBottom: '1rem',
  },
}));

export { productsViewStyle };
