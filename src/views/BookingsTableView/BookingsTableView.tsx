import React from 'react';
import { useQuery } from 'react-query';
import { useOmangaContex } from '../../context/OmangaContext';
import { redirect, useNavigate } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  CircularProgress,
} from '@mui/material';
import { bookingsTableViewStyle } from './bookingsTableViewStyle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { TextFieldTable } from '../../components/TextFieldTable';
import { DateFieldTable } from '../../components/DateFieldTable';
import { SingleSelect } from '../../components/singleSelect';
import { ModalTable } from '../../components/ModalTable/ModalTable';
import { DeleteRawTable } from '../../components/DeleteRowTable';
import { UpdateBookingStatus } from './UpdateBookingStatus';
import { removeAccents } from '../../utils/removeAccents';
import { selectStatus } from './selectStatus';
import { deleteOneBooking, getAllBookings } from '../../services/bookings';

const useStyles = bookingsTableViewStyle;

interface BookingsTableViewProps {}

const BookingsTableView: React.FC<BookingsTableViewProps> = () => {
  const classes = useStyles();
  const { OmangaState } = useOmangaContex();
  const { user } = OmangaState;

  const { data, isLoading, error } = useQuery({
    queryKey: ['getAllBookings'],
    queryFn: () => getAllBookings(),
  });

  const [idItem, setIdItem] = React.useState<number>(0);
  const [idBooking, setIdBooking] = React.useState<number>();
  const [date, setDate] = React.useState<string>('');
  const [customer, setCustomer] = React.useState<string>('');
  const [status, setStatus] = React.useState<string>('');

  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleBookingArchivate = (id: number) => {
    setIdItem(id);
    handleOpenUpdateModal();
  };

  const handleDeleteBooking = (id: number) => {
    setIdItem(id);
    handleOpenDeleteModal();
  };

  const handleIdBookingChange = (value: string | number) => {
    setIdBooking(value as number);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  const handleCustomerChange = (value: string | number) => {
    setCustomer(value as string);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as string);
  };

  const getFitleredBookings = () => {
    let filteredRows = [...(data?.data ?? [])];
    if (idBooking) {
      filteredRows = filteredRows.filter((row) => row.id === Number(idBooking));
    }
    if (date) {
      filteredRows = filteredRows.filter((row) => row.order_date === date);
    }
    // if (customer) {
    //   filteredRows = filteredRows.filter((row) =>
    //     removeAccents(row.name).includes(removeAccents(customer))
    //   );
    // }

    // if (status) {
    //   filteredRows = filteredRows.filter((row) => row.state === status);
    // }
    return filteredRows;
  };

  const AllBookings = getFitleredBookings();

  // if (!user.isAdmin) {redirect('/error')};

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
        style={{
          height: '77vh',
          width: '85%',
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
          <Grid item xs={3}>
            <TextFieldTable
              label={'ID commande'}
              value={idBooking}
              onChange={handleIdBookingChange}
            />
          </Grid>
          <Grid item xs={3}>
            <DateFieldTable
              label={'Date'}
              value={date}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldTable
              label={'Client'}
              value={customer}
              onChange={handleCustomerChange}
            />
          </Grid>
          <Grid item xs={3}>
            <SingleSelect
              selectItems={selectStatus}
              selectName={'Etat'}
              onChange={handleStatusChange}
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
                  <TableCell>Client</TableCell>
                  <TableCell>Prix</TableCell>
                  {/* <TableCell>Produit</TableCell>
                  <TableCell>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {AllBookings.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.order_date}</TableCell>
                    <TableCell>{row.user_id}</TableCell>
                    {/* <TableCell>{row.prix}</TableCell>
                    <TableCell>{row.produit}</TableCell> */}
                    <TableCell>
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={() => handleBookingArchivate(row.id)}
                        style={{ marginRight: '1rem' }}
                      >
                        <SystemUpdateAltIcon />
                      </Button>
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
      <ModalTable open={openUpdateModal} handleClose={handleCloseUpdateModal}>
        <UpdateBookingStatus
          rowId={idItem}
          item={'la réservation'}
          onClose={handleCloseUpdateModal}
        />
      </ModalTable>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal}>
        <DeleteRawTable
          rowId={idItem}
          item={'la réservation'}
          onClose={handleCloseDeleteModal}
          deleteRow={(idItem: number) =>
            deleteOneBooking(idItem, user?.user.email)
          }
          userMail={''}
        />
      </ModalTable>
    </>
  );
};

export { BookingsTableView };
