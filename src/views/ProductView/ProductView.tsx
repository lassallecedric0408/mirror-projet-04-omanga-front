import React, { useState } from "react";
import { materialUITheme } from "../../utils/materialUITheme";
import { useOmangaContex } from "../../context/OmangaContext";
import { useQuery } from "react-query";
import { Link, redirect, useParams } from "react-router-dom";
import {
  Button,
  Stack,
  Paper,
  CircularProgress,
  Grid,
  useTheme,
  Typography,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { getOneProduct } from "../../services/products";
import { ModalTable } from "../../components/ModalTable";
import { AddReviewForm } from "./AddReviewForm";
import { OrderProductForm } from "./OrderProductForm";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: `${materialUITheme.palette.primary.main}`,
  padding: theme.spacing(1),
  color: `${materialUITheme.palette.secondary.main}`,
}));

interface ProductViewProps {}

const ProductView: React.FC<ProductViewProps> = () => {
  const theme = useTheme();
  const { OmangaState } = useOmangaContex();
  const { isLogged } = OmangaState;
  let { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getOneProduct", id],
    queryFn: () => getOneProduct(Number(id)),
  });
  console.log(data);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const handleOpenReviewModal = () => setOpenReviewModal(true);
  const handleCloseReviewModal = () => setOpenReviewModal(false);

  const [openOrderModal, setOpenOrderModal] = useState(false);
  const handleOpenOrderModal = () => setOpenOrderModal(true);
  const handleCloseOrderModal = () => setOpenOrderModal(false);

  if (isLoading) {
    return (
      <div
        style={{
          height: "77vh",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    redirect("/error");
  }

  return (
    <>
      <Grid
        container
        sx={{
          height: "77vh",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          overflow: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            height: "10vh",
            fontSize: "1.6rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: `${materialUITheme.palette.primary.main}`,
            [theme.breakpoints.down("md")]: {
              fontSize: "1.3rem",
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: "1rem",
            },
          }}
        >
          <p> {data?.data.name}</p>
        </Grid>
        <Grid
          container
          sx={{
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={12} md={8}>
            <p
              style={{
                lineHeight: "2.5rem",
                fontSize: "1.3rem",
                fontFamily: "Caveat",
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={data?.data.image_url}
              alt={data?.data.name}
              width="300"
              height="300"
            />
            <Typography
              variant="h6"
              color="primary"
              sx={{ margin: "1rem 0 1rem 0" }}
            >
              {data?.data.price} €
            </Typography>
            {isLogged ? (
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "2rem" }}
                onClick={handleOpenOrderModal}
              >
                Réserver le produit
              </Button>
            ) : (
              <small>
                Vous voulez rerserser ce produit?&nbsp;
                <Link to="/login">Connectez-vous</Link>
              </small>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            item
            sx={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h5"
              color="primary"
              sx={{ margin: "0 0 1rem 0" }}
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
              sx={{ width: "100%", height: "100%", overflowY: "auto" }}
            >
              {data?.data.reviews.map((review, index) => {
                return (
                  <Item key={index}>
                    <Stack>
                      <Typography
                        variant="h6"
                        display="block"
                        gutterBottom
                        sx={{ fontFamily: "Caveat" }}
                      >
                        {review.user_id}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        display="block"
                        gutterBottom
                        sx={{ fontFamily: "Caveat" }}
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
      </Grid>
      <ModalTable open={openReviewModal} handleClose={handleCloseReviewModal}>
        <AddReviewForm onClose={handleCloseReviewModal} id={id} />
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
