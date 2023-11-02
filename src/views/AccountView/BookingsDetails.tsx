import React, { useState } from "react";
import { redirect } from "react-router-dom";
import useAuthStore from "../../states/OmangaStore";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { TextFieldTable } from "../../components/TextFieldTable";
import { ModalTable } from "../../components/ModalTable/ModalTable";
import { DeleteUserBooking } from "./DeleteUserBooking";
import { getUserBookings } from "../../services/bookings";
import { Booking } from "../../models/Booking";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const BookingsDetails: React.FC = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user.user);
  const isLogged = useAuthStore((state) => state.isLogged);

  if (!user) {
    throw new Error("User not found");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getAllBookings", user],
    queryFn: () => getUserBookings(user.id, user.email),
  });

  const AllBookings = data?.data ?? [];
  const [booking, setBooking] = React.useState<Booking>({
    id: 0,
    order_date: "",
    archeving_date: "",
    product_quantity: 0,
    product_id: 0,
    user_id: 0,
  });
  const [idProduct, setIdProduct] = useState<number>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteBooking = (row: Booking) => {
    setBooking(row);
    handleOpenDeleteModal();
  };

  const handleIdProductChange = (value: string | number) => {
    setIdProduct(value as number);
  };

  const navigateToProductId = (id: number) => {
    navigate(`/product/${id}`);
  };

  const getFitleredBookings = () => {
    let filteredBookings = [...AllBookings];
    if (idProduct) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.id === Number(idProduct),
      );
    }
    return filteredBookings;
  };

  const filteredBookings = getFitleredBookings();

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

  if (!isLogged) {
    redirect("/");
  }

  return (
    <>
      <Grid
        container
        style={{
          height: "67vh",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          Réservations
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "3rem",
            marginBottom: "1rem",
            width: "100%",
            flex: "0",
          }}
        >
          <Grid item xs={4}>
            <TextFieldTable
              label={"ID commande"}
              value={idProduct}
              onChange={handleIdProductChange}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            width: "100%",
            flex: "1",
            overflowY: "auto",
            maxHeight: "100%",
            marginBottom: "1rem",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID commande</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Lien</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.order_date.split("T")[0]}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        onClick={() => navigateToProductId(row.id)}
                      >
                        Afficher le produit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleDeleteBooking(row)}
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal}>
        <DeleteUserBooking
          row={booking}
          onClose={handleCloseDeleteModal}
          userMail={user?.email}
        />
      </ModalTable>
    </>
  );
};

export { BookingsDetails };
