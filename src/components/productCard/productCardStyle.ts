import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const productCardStyle = makeStyles((theme) => ({
  root: {
    border: `0.1rem solid ${materialUITheme.palette.primary.main}`,
    borderRadius: '40px',
  },
  cardTitle: {
    fontFamily: 'Caveat',
    color: `${materialUITheme.palette.primary.main}`,
  },
}));

export { productCardStyle };
