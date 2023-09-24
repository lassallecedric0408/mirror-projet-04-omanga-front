import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { products } from '../ProductsView/products'
import { Product } from '../../models/Product';
import { materialUITheme } from '../../utils/materialUITheme';
import { Button, TextField, Stack, Paper, Modal, Box, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import katana from '../../assets/katana-154939_1280.png';

import { useStyles } from './productViewStyle';
import { styled } from '@mui/material/styles';
import { useOmangaContex } from '../../context/OmangaContext';



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  height: '60vh',
  bgcolor: 'background.paper',
  border: `2px solid ${materialUITheme.palette.primary.main}`,
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: `${materialUITheme.palette.primary.main}`,
  padding: theme.spacing(1),
  color: `${materialUITheme.palette.secondary.main}`,
}));


const reviews = [{ userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' }, { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' }, { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' }, { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' }, { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' }, { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' }, { userName: 'John Doe', review: 'Lorem ipsum dolor sit amet, consectet' }]

interface ProductViewProps {
}

const ProductView: React.FC<ProductViewProps> = () => {
  let { id } = useParams();
  const classes = useStyles();

  const { OmangaState } = useOmangaContex();
  const { isLogged } = OmangaState;

  const product: Product = products[Number(id)];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmit = (event: any) => {
    event.preventDefault()

    setCommentError(false);

    if (comment === '') {
      setCommentError(true)
    }

    if (comment) {
      console.log(comment)
      setComment("");
      handleClose();
      handleOpenSnackbar();
    }
  }

  return (
    <>
      <Grid container className={`${classes.ProductView}`}>
        <Grid item className={`${classes.productTitle} ${classes.flexCenter}`}>
          <p> {product.name}</p>
        </Grid>
        <Grid container className={`${classes.productDescriptionContainer} ${classes.flexCenter}`}>
          <Grid item xs={12} sm={12} md={8} >
            <p className={classes.productDescription}>Lorem ipsum dolor sit amet. Sit officiis itaque sed molestias veritatis est dolore incidunt. Id expedita rerum ut itaque totam non alias dolor. Est sint voluptatem non sequi odit eos quos deleniti et iusto provident ad aliquam inventore. Et galisum itaque quo reprehenderit libero hic voluptatem unde in earum debitis et quos magni.
              Ut galisum dicta ab quod nihil 33 sequi enim id officiis quisquam aut error dolor. Qui totam neque et quibusdam internos qui dignissimos saepe eos voluptas autem 33 perspiciatis harum. Aut dicta architecto et saepe voluptatem et blanditiis voluptas in saepe molestiae aut officiis quaerat.
              Aut eaque quia et voluptatem ipsa est quidem dolore At minima ullam quo voluptate explicabo et eveniet laboriosam. Ut consequatur labore est officia repellendus eum omnis natus et consequuntur dolor non voluptate sapiente sed sint eius.</p>
          </Grid >
          <Grid item className={`${classes.productImageContainer} ${classes.flexCenter}`} xs={12} sm={12} md={4} >
            <img src={katana} alt={katana} width="300" height="300" />
            {isLogged ?? <Button variant="contained" color='primary' style={{ marginTop: '2rem' }}>Réserver le produit</Button>}
          </Grid>
        </Grid>
        <Grid container className={classes.reviewContainer}>
          <Grid item style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <p className={classes.reviewTitle}>Avis</p>
            {isLogged ?? <Button onClick={handleOpen}>Ajouter un avis</Button>}
          </Grid>
          <Grid item>
            <Stack spacing={2}>
              {
                reviews.map((review, index) => {
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
                  )
                })
              }
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container className={classes.modalContainer}>
            <form autoComplete="off" onSubmit={handleSubmit} style={{ width: '80%' }}>
              <h2 className={classes.formTitle}>Votre avis nous intéresse</h2>
              <TextField
                label="Votre avis"
                onChange={e => setComment(e.target.value)}
                multiline
                rows={6}
                required
                variant="outlined"
                color="primary"
                type="text"
                sx={{ mb: 3 }}
                fullWidth
                value={comment}
                error={commentError}
              />
              <Button variant="outlined" color="primary" type="submit" className={classes.formSubmitButton}>Envoyez votre Avis</Button>
            </form>
          </Grid>
        </Box>
      </Modal>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Nous avons bien reçu votre avis, merci !
        </Alert>
      </Snackbar>
    </>
  );
};

export { ProductView };