import React from "react";
import { redirect } from "react-router-dom";
import useAuthStore from "../../states/OmangaStore";
import { useQuery } from "react-query";

import { TextFieldTable } from "../../components/TextFieldTable";
import { DateFieldTable } from "../../components/DateFieldTable";
import { ModalTable } from "../../components/ModalTable/ModalTable";
import { getAllBookings } from "../../services/bookings";
import { Booking } from "../../models/Booking";
import { DeleteBooking } from "./DeleteBooking";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  useTheme,
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { materialUITheme } from "../../utils/materialUITheme";

const BookingsTableView: React.FC = () => {
  const theme = useTheme();

  const user = useAuthStore((state) => state.user.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  if (!user) {
    throw new Error("User not found");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllBookings", user],
    queryFn: () => getAllBookings(user.email),
  });

  const [booking, setBooking] = React.useState<Booking>({
    id: 0,
    order_date: "",
    archeving_date: "",
    product_quantity: 0,
    product_id: 0,
    user_id: 0,
  });

  const [idBooking, setIdBooking] = React.useState<number>();
  const [date, setDate] = React.useState<string>("");

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteBooking = (row: Booking) => {
    setBooking(row);
    handleOpenDeleteModal();
  };

  const handleIdBookingChange = (value: string | number) => {
    setIdBooking(value as number);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  const getFitleredBookings = () => {
    let filteredRows = [...(data?.data ?? [])];
    if (idBooking) {
      filteredRows = filteredRows.filter((row) => row.id === Number(idBooking));
    }
    return filteredRows;
  };

  const AllBookings = getFitleredBookings();

  if (user.role === "USER") {
    redirect("/error");
  }

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

  if (!isAdmin) {
    redirect("/error");
  }

  return (
    <>
      <Grid
        container
        style={{
          height: "77vh",
          width: "85%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          item
          sx={{
            height: "7vh",
            fontSize: "1.6rem",
            color: `${materialUITheme.palette.primary.main}`,
            [theme.breakpoints.down("md")]: {
              fontSize: "1.3rem",
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: "1rem",
            },
            display: "flex",
            alignItems: "center",
          }}
        >
          <p> Réservations</p>
        </Grid>
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
          <Grid item xs={3}>
            <TextFieldTable
              label={"ID commande"}
              value={idBooking}
              onChange={handleIdBookingChange}
            />
          </Grid>
          <Grid item xs={3}>
            <DateFieldTable
              label={"Date"}
              value={date}
              onChange={handleDateChange}
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
                  <TableCell>Client</TableCell>
                  <TableCell>Prix</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AllBookings.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.order_date}</TableCell>
                    <TableCell>{row.user_id}</TableCell>
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
        <DeleteBooking
          row={booking}
          onClose={handleCloseDeleteModal}
          userMail={user.email}
        />
      </ModalTable>
    </>
  );
};

export { BookingsTableView };
