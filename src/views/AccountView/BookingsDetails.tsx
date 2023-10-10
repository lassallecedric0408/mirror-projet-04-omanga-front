import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useOmangaContex } from '../../context/OmangaContext';

import { TextFieldTable } from '../../components/TextFieldTable';
import { DateFieldTable } from '../../components/DateFieldTable';
import { ModalTable } from '../../components/ModalTable/ModalTable';
import { DeleteRawTable } from '../../components/DeleteRowTable';

import { deleteOneUserOrder } from '../../services/users';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { materialUITheme } from '../../utils/materialUITheme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexVertCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  bookingsTitle: {
    height: '7vh',
    fontSize: '1.6rem',
    color: `${materialUITheme.palette.primary.main}`,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  selectContainer: {
    marginTop: '3rem',
    marginBottom: '1rem',
    width: '100%',
    flex: '0',
  },
  tableContainer: {
    width: '100%',
    flex: '1',
    overflowY: 'auto',
    maxHeight: '100%',
    marginBottom: '1rem',
  },
}));

interface ViewsProps {}

const BookingsDetails: React.FC<ViewsProps> = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { dispatch, OmangaState } = useOmangaContex();
  const { user } = OmangaState;
  const userBookings = user?.bookings ?? [];

  const [bookingsUserData, setBookingsUserData] = useState(
    user?.bookings ?? []
  );

  const [idItem, setIdItem] = useState<number>(0);
  const [idProduct, setIdProduct] = useState<number>();
  const [date, setDate] = useState<string>('');
  const [article, setArticle] = useState<string>('');

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteBooking = (id: number) => {
    setIdItem(id);
    handleOpenDeleteModal();
  };

  const handleIdProductChange = (value: string | number) => {
    setIdProduct(value as number);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  const handleArticleChange = (value: string | number) => {
    setArticle(value as string);
  };

  const navigateToProductId = (id: number) => {
    navigate(`/product/${id}`);
  };

  const getFitleredBookings = () => {
    let filteredBookings = [...userBookings];
    if (idProduct) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.id === Number(idProduct)
      );
    }
    if (date) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.date === date
      );
    }
    if (article) {
      filteredBookings = filteredBookings.filter((booking) =>
        booking.productName
          .toLocaleLowerCase()
          .includes(article.toLocaleLowerCase())
      );
    }
    return filteredBookings;
  };

  // useEffect(() => {
  //   const filteredBookings = getFitleredBookings();
  //   setBookingsUserData(filteredBookings);
  // }, [bookings, idProduct, date, article]);

  const filteredBookings = getFitleredBookings();
  return (
    <>
      <Grid
        container
        style={{
          height: '67vh',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid
          item
          className={`${classes.bookingsTitle} ${classes.flexVertCenter}`}
        >
          <p> Réservations</p>
        </Grid>
        <Grid container spacing={2} className={classes.selectContainer}>
          <Grid item xs={4}>
            <TextFieldTable
              label={'ID commande'}
              value={idProduct}
              onChange={handleIdProductChange}
            />
          </Grid>
          <Grid item xs={4}>
            <DateFieldTable
              label={'Date'}
              value={date}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldTable
              label={'Article'}
              value={article}
              onChange={handleArticleChange}
            />
          </Grid>
        </Grid>
        <Grid item className={classes.tableContainer}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID commande</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Article</TableCell>
                  <TableCell>Prix</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Lien</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.productName}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.productnumber}</TableCell>
                    <TableCell>{row.totalProductPrice}</TableCell>
                    <TableCell>
                      <Button
                        variant='text'
                        onClick={() => navigateToProductId(row.id)}
                      >
                        Afficher le produit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={() => handleDeleteBooking(row.id)}
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
        <DeleteRawTable
          rowId={idItem}
          item={'la réservation'}
          onClose={handleCloseDeleteModal}
          deleteRow={(idItem) => deleteOneUserOrder({ id: idItem })}
        />
      </ModalTable>
    </>
  );
};

export { BookingsDetails };
