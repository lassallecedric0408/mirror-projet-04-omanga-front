import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const dashBoardViewStyle = makeStyles((theme) => ({
  dashBoardView: {
    height: '77vh',
    width: '80%',
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
  dashBoardTitle: {
    height: '10vh',
    fontSize: '1.6rem',
    color: `${materialUITheme.palette.primary.main}`,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.4rem',
      height: '5vh',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  dashBoardItemsContainer: {
    height: '67vh',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    [theme.breakpoints.down('md')]: {
      paddingTop: '3rem',
      paddingBottom: '1rem',
      height: '72vh',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '1rem',
      paddingBottom: '1rem',
      height: '75vh',
    },
  },
  dashBoardItem: {
    height: '100%',
    width: '100%',
    border: `0.1rem solid ${materialUITheme.palette.primary.main}`,
    borderRadius: '40px',
  },
  dashBoardItemTitle: {
    fontSize: '2rem',
    color: `${materialUITheme.palette.primary.main}`,
  },
  dashBoardItemLink: {
    textDecoration: 'none',
  },
  dashBordBadge: {
    border: `0.1rem solid ${materialUITheme.palette.primary.main}`,
    color: `${materialUITheme.palette.primary.main}`,
  },
}));

export { dashBoardViewStyle };
