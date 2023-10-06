import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { products } from '../ProductsView/products';
import { ModalTable } from '../../components/ModalTable';
import { AddReviewForm } from './AddReviewForm';
import { OrderProductForm } from './OrderProductForm';
import { Product } from '../../models/Product';
import { materialUITheme } from '../../utils/materialUITheme';
import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, Paper } from '@mui/material';
import katana from '../../assets/katana-154939_1280.png';

import { useStyles } from './productViewStyle';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: `${materialUITheme.palette.primary.main}`,
  padding: theme.spacing(1),
  color: `${materialUITheme.palette.secondary.main}`,
}));

const reviews = [
  { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' },
  { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' },
  { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' },
  { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' },
  { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' },
  { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' },
  { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' },
];

interface ProductViewProps {}

const ProductView: React.FC<ProductViewProps> = () => {
  let { id } = useParams();
  const classes = useStyles();

  // const { OmangaState } = useOmangaContex();
  // const { isLogged } = OmangaState;
  const isLogged =
    localStorage.getItem('userIsLogged') === 'true' ? true : false;
  console.log(isLogged);
  const product: Product = products[Number(id)];

  const [openReviewModal, setOpenReviewModal] = useState(false);
  const handleOpenReviewModal = () => setOpenReviewModal(true);
  const handleCloseReviewModal = () => setOpenReviewModal(false);

  const [openOrderModal, setOpenOrderModal] = useState(false);
  const handleOpenOrderModal = () => setOpenOrderModal(true);
  const handleCloseOrderModal = () => setOpenOrderModal(false);

  return (
    <>
      <Grid container className={`${classes.ProductView}`}>
        <Grid item className={`${classes.productTitle} ${classes.flexCenter}`}>
          <p> {product.name}</p>
        </Grid>
        <Grid
          container
          className={`${classes.productDescriptionContainer} ${classes.flexCenter}`}
        >
          <Grid item xs={12} sm={12} md={8}>
            <p className={classes.productDescription}>
              Lorem ipsum dolor sit amet. Sit officiis itaque sed molestias
              veritatis est dolore incidunt. Id expedita rerum ut itaque totam
              non alias dolor. Est sint voluptatem non sequi odit eos quos
              deleniti et iusto provident ad aliquam inventore. Et galisum
              itaque quo reprehenderit libero hic voluptatem unde in earum
              debitis et quos magni. Ut galisum dicta ab quod nihil 33 sequi
              enim id officiis quisquam aut error dolor. Qui totam neque et
              quibusdam internos qui dignissimos saepe eos voluptas autem 33
              perspiciatis harum. Aut dicta architecto et saepe voluptatem et
              blanditiis voluptas in saepe molestiae aut officiis quaerat. Aut
              eaque quia et voluptatem ipsa est quidem dolore At minima ullam
              quo voluptate explicabo et eveniet laboriosam. Ut consequatur
              labore est officia repellendus eum omnis natus et consequuntur
              dolor non voluptate sapiente sed sint eius.
            </p>
          </Grid>
          <Grid
            item
            className={`${classes.productImageContainer} ${classes.flexCenter}`}
            xs={12}
            sm={12}
            md={4}
          >
            <img src={katana} alt={katana} width='300' height='300' />
            {isLogged && (
              <Button
                variant='contained'
                color='primary'
                style={{ marginTop: '2rem' }}
                onClick={handleOpenOrderModal}
              >
                Réserver le produit
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container className={classes.reviewContainer}>
          <Grid
            item
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p className={classes.reviewTitle}>Avis</p>
            {isLogged && (
              <Button onClick={handleOpenReviewModal}>
                <AddIcon sx={{ fontSize: 30 }} /> Ajouter un avis
              </Button>
            )}
          </Grid>
          <Grid item>
            <Stack spacing={2}>
              {reviews.map((review, index) => {
                return (
                  <Item>
                    <Grid container className={classes.reviewDetails}>
                      <Grid item>
                        <p>{review.userName}</p>
                      </Grid>
                      <Grid item>
                        <p>{review.review}</p>
                      </Grid>
                    </Grid>
                  </Item>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <ModalTable open={openReviewModal} handleClose={handleCloseReviewModal}>
        <AddReviewForm onClose={handleCloseReviewModal} />
      </ModalTable>
      <ModalTable open={openOrderModal} handleClose={handleCloseOrderModal}>
        <OrderProductForm name={product.name} onClose={handleCloseOrderModal} />
      </ModalTable>
    </>
  );
};

export { ProductView };
