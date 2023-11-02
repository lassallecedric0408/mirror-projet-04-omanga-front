import React, { useEffect, useState } from 'react';
import useAuthStore from '../../states/OmangaStore';
import { Link, redirect, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getOneProduct } from '../../services/products';
import { ModalTable } from '../../components/ModalTable';
import { AddReviewForm } from './AddReviewForm';
import { OrderProductForm } from './OrderProductForm';
import { ReviewDetails } from './ReviewDetails';

import {
  Button,
  Stack,
  CircularProgress,
  Grid,
  useTheme,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { materialUITheme } from '../../utils/materialUITheme';

const ProductView: React.FC = () => {
  const theme = useTheme();

  const isLogged = useAuthStore((state) => state.isLogged);
  let { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getOneProduct', id],
    queryFn: () => getOneProduct(Number(id)),
  });

  const [openReviewModal, setOpenReviewModal] = useState(false);
  const handleOpenReviewModal = () => setOpenReviewModal(true);
  const handleCloseReviewModal = () => setOpenReviewModal(false);

  const [openOrderModal, setOpenOrderModal] = useState(false);
  const handleOpenOrderModal = () => setOpenOrderModal(true);
  const handleCloseOrderModal = () => setOpenOrderModal(false);
  const [allReviews, setAllReviews] = useState(
    data?.data?.reviews ? [...data?.data?.reviews] : []
  );
  if (isLoading) {
    return (
      <div
        style={{
          height: '77vh',
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
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
          overflowY: 'auto',
          maxHeight: '100%',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            height: '10vh',
            fontSize: '1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: `${materialUITheme.palette.primary.main}`,
            [theme.breakpoints.down('md')]: {
              fontSize: '1.3rem',
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: '1rem',
            },
          }}
        >
          <p> {data?.data.name}</p>
        </Grid>
        <Grid
          container
          sx={{
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} sm={12} md={8}>
            <p
              style={{
                lineHeight: '2.5rem',
                fontSize: '1.3rem',
                fontFamily: 'Caveat',
              }}
            >
              {data?.data.description}
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <img
              src={data?.data.image_url}
              alt={data?.data.name}
              width='300'
              height='300'
            />
            <Typography
              variant='h6'
              color='primary'
              sx={{ margin: '1rem 0 1rem 0' }}
            >
              {data?.data.price} €
            </Typography>
            {isLogged ? (
              <Button
                variant='contained' // product_id: number | undefined;
                color='primary'
                style={{ marginTop: '2rem' }}
                onClick={handleOpenOrderModal}
              >
                Réserver le produit
              </Button>
            ) : (
              <small>
                Vous voulez réserver ce produit?&nbsp;
                <Link to='/login'>Connectez-vous</Link>
              </small>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid
            item
            sx={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant='h5'
              color='primary'
              sx={{ margin: '0 0 1rem 0' }}
            >
              Avis
            </Typography>
            {isLogged && (
              <Button onClick={handleOpenReviewModal}>
                <AddIcon sx={{ fontSize: 30 }} /> Ajouter un avis
              </Button>
            )}
          </Grid>
          <Grid item>
            <Stack
              spacing={2}
              sx={{ width: '100%', height: '100%', marginBottom: '1rem' }}
            >
              {allReviews.map((review, index) => (
                <ReviewDetails
                  index={index}
                  userId={review.user_id}
                  content={review.content}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <ModalTable open={openReviewModal} handleClose={handleCloseReviewModal}>
        <AddReviewForm
          onClose={handleCloseReviewModal}
          id={id}
          allReviews={allReviews}
          setAllReviews={setAllReviews}
        />
      </ModalTable>
      <ModalTable open={openOrderModal} handleClose={handleCloseOrderModal}>
        <OrderProductForm
          name={data?.data.name}
          onClose={handleCloseOrderModal}
          id={id}
        />
      </ModalTable>
    </>
  );
};

export { ProductView };
