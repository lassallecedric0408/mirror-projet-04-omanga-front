import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { redirect, useParams } from 'react-router-dom';

import { getOneProduct } from '../../services/products';
import { ModalTable } from '../../components/ModalTable';
import { AddReviewForm } from './AddReviewForm';
import { OrderProductForm } from './OrderProductForm';

import {
  Button,
  Stack,
  Paper,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { materialUITheme } from '../../utils/materialUITheme';
import { productViewStyle } from './productViewStyle';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: `${materialUITheme.palette.primary.main}`,
  padding: theme.spacing(1),
  color: `${materialUITheme.palette.secondary.main}`,
}));

const useStyles = productViewStyle;

interface ProductViewProps {}

const ProductView: React.FC<ProductViewProps> = () => {
  const classes = useStyles();

  let { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getOneProduct', id],
    queryFn: () => getOneProduct(Number(id)),
  });

  const isLogged =
    localStorage.getItem('userIsLogged') === 'true' ? true : false;

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
      <Grid
        container
        sx={{
          height: '77vh',
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          overflow: 'hidden',
        }}
      >
        <Grid item className={classes.productTitle} xs={12} sm={12} md={12}>
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
            className={classes.productImageContainer}
            xs={12}
            sm={12}
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
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

          <Stack spacing={2} sx={{ width: '100%', overflow: 'auto' }}>
            {data?.data.reviews.map((review, index) => {
              return (
                <Item key={index}>
                  <Stack>
                    <Typography
                      variant='subtitle1'
                      display='block'
                      gutterBottom
                      sx={{ fontFamily: 'Caveat' }}
                    >
                      {review.user_id}
                    </Typography>
                    <Typography
                      variant='subtitle2'
                      display='block'
                      gutterBottom
                      sx={{ fontFamily: 'Caveat' }}
                    >
                      {review.content}
                    </Typography>
                  </Stack>
                </Item>
              );
            })}
          </Stack>
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
