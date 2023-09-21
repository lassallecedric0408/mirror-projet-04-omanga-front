import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const homeViewStyle = makeStyles((theme) => ({
  home: {
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
  flexVertCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  presentation: { height: '32vh', display: 'flex', flexDirection: 'column' },
  presentationTitle: {
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
  presentationContent: {
    height: '25vh',
  },
  presentationMessageContainer: {
    padding: '0 2rem',
  },
  presentationMessage: {
    fontWeight: 'lighter',
    fontFamily: 'Caveat',
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  },
  mapContainer: {
    height: '25vh',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  map: {
    height: '100%',
    border: `0.1rem solid ${materialUITheme.palette.primary.main}`,
    borderRadius: '40px',
  },
  products: {
    height: '45vh',
  },
  productsTitle: {
    height: '5vh',
    fontSize: '1.6rem',
    color: `${materialUITheme.palette.primary.main}`,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  productsSlippers: { height: '40vh' },
  imgBox: {
    display: 'block',
    overflow: 'hidden',
    width: '25%',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
  textBox: {
    margin: '0.5rem',
    fontFamily: 'Caveat',
    fontWeight: 'lighter',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.7rem',
    },
  },
}));

export { homeViewStyle };
