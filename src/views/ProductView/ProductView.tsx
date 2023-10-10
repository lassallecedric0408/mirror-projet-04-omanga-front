import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { redirect, useParams } from 'react-router-dom';

import { getOneProduct } from '../../services/products';
import { ModalTable } from '../../components/ModalTable';
import { AddReviewForm } from './AddReviewForm';
import { OrderProductForm } from './OrderProductForm';

import { Button, Stack, Paper, CircularProgress, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { materialUITheme } from '../../utils/materialUITheme';
import classes from './productViewStyle.module.css';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: `${materialUITheme.palette.primary.main}`,
  padding: theme.spacing(1),
  color: `${materialUITheme.palette.secondary.main}`,
}));

interface ProductViewProps {}

const ProductView: React.FC<ProductViewProps> = () => {
  let { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getOneProduct', id],
    queryFn: () => getOneProduct(Number(id)),
  });

  const isLogged =
    localStorage.getItem('userIsLogged') === 'true' ? true : false;
  console.log(isLogged);

  const [openReviewModal, setOpenReviewModal] = useState(false);
  const handleOpenReviewModal = () => setOpenReviewModal(true);
  const handleCloseReviewModal = () => setOpenReviewModal(false);

  const [openOrderModal, setOpenOrderModal] = useState(false);
  const handleOpenOrderModal = () => setOpenOrderModal(true);
  const handleCloseOrderModal = () => setOpenOrderModal(false);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    redirect('/error');
  }

  return (
    <>
      <Grid container className={`${classes.ProductView}`}>
        <Grid item className={`${classes.productTitle} ${classes.flexCenter}`}>
          <p> {data?.data.name}</p>
        </Grid>
        <Grid
          container
          className={`${classes.productDescriptionContainer} ${classes.flexCenter}`}
        >
          <Grid item xs={12} sm={12} md={8}>
            <p className={classes.productDescription}>
              {data?.data.description}
            </p>
          </Grid>
          <Grid
            item
            className={`${classes.productImageContainer} ${classes.flexCenter}`}
            xs={12}
            sm={12}
            md={4}
          >
            <img
              src={data?.data.image_url}
              alt={data?.data.name}
              width='300'
              height='300'
            />
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
              {data?.data.reviews.map((review, index) => {
                return (
                  <Item>
                    <Grid container className={classes.reviewDetails}>
                      <Grid item>
                        <p>{review.user_id}</p>
                      </Grid>
                      <Grid item>
                        <p>{review.content}</p>
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
        <OrderProductForm
          name={data?.data.name}
          onClose={handleCloseOrderModal}
        />
      </ModalTable>
    </>
  );
};

export { ProductView };
