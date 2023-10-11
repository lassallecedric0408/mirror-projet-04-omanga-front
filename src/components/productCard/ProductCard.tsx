import { Link as RouterLink } from 'react-router-dom';

import {
  Card,
  CardContent,
  Paper,
  CardMedia,
  CardActionArea,
  Typography,
} from '@mui/material';

import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const productCardStyle = makeStyles((theme) => ({
  root: {
    border: `0.1rem solid ${materialUITheme.palette.primary.main}`,
    borderRadius: '40px',
    textDecoration: 'none',
    height: '100%',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textDecoration: 'none',
  },
  cardTitle: {
    fontFamily: 'Caveat',
    color: `${materialUITheme.palette.primary.main}`,
  },
}));

interface ProductsCardProps {
  index: number;
  name: string;
  price: number;
  imageLink: string;
}

const useStyles = productCardStyle;

const ProductCard: React.FC<ProductsCardProps> = ({
  index,
  name,
  price,
  imageLink,
}) => {
  const classes = useStyles();
  const roundedPrice = (price * 100).toFixed(2);
  return (
    <Paper elevation={5} style={{ height: '100%', textDecoration: 'none' }}>
      <RouterLink to={`/product/${index + 1}`}>
        <Card className={classes.root}>
          <CardActionArea>
            <div style={{ position: 'relative', paddingBottom: '100%' }}>
              <CardMedia
                component='img'
                image={imageLink}
                alt="Image de l'article"
                sx={{
                  position: 'absolute',
                  width: '70%',
                  height: '70%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  objectFit: 'contain',
                }}
              />
            </div>
            <CardContent className={classes.cardContent}>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{
                  fontFamily: 'Caveat',
                  color: `${materialUITheme.palette.primary.main}`,
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
                color={'primary'}
              >
                {name}
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  fontFamily: 'Caveat',
                  color: `${materialUITheme.palette.primary.main}`,
                  textDecoration: 'none',
                }}
                color={'primary'}
              >
                {roundedPrice}€
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </RouterLink>
    </Paper>
  );
};

export { ProductCard };
