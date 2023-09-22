import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { CardActionArea } from '@mui/material';
import { productCardStyle } from './productCardStyle';
import {
  Link as RouterLink
} from 'react-router-dom'

interface ProductsCardProps {
  index: number;
  name: string;
  price: number;
  imageLink: string;
}

const useStyles = productCardStyle;

const ProductCard: React.FC<ProductsCardProps> = ({ index, name, price, imageLink }) => {

  const classes = useStyles();

  return (
    <Paper elevation={5}>
      <RouterLink to={`/product/${index}`}>
        <Card className={classes.root}>
          <CardActionArea>
            <div style={{ position: 'relative', paddingBottom: '100%' }}>
              <CardMedia
                component="img"
                image={imageLink}
                alt="Image de l'article"
                style={{
                  position: 'absolute',
                  width: '70%',
                  height: '70%',
                  top: '50%',
                  left: '50%',
                  transform: "translate(-50%, -50%)",
                  objectFit: 'contain'
                }}
              />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" className={classes.cardTitle}>
                {name}
              </Typography>
              <Typography variant="body2" className={classes.cardTitle}>
                {price}€
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </RouterLink>
    </Paper>
  );
}

export { ProductCard };