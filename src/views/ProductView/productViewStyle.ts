import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ProductView: {
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
  productTitle: {
    height: '10vh',
    fontSize: '1.6rem',
    color: `${materialUITheme.palette.primary.main}`,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  productDescriptionContainer: {
    marginBottom: '2rem',
  },
  productDescription: {
    lineHeight: '2.5rem',
    fontSize: '1.3rem',
    fontFamily: 'Caveat',
  },
  productImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  reviewTitle: {
    fontSize: '1.6rem',
    color: `${materialUITheme.palette.primary.main}`,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  addReviewButton: {
    fontSize: '1.6rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  reviewDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    color: `${materialUITheme.palette.primary.main}`,
    paddingBottom: '2rem',
  },
  formSubmitButton: { marginTop: '2rem' },
}));

export { useStyles };
