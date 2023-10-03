import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import { bookingsTableViewStyle } from './bookingsTableViewStyle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { TextFieldTable } from '../../components/TextFieldTable';
import { DateFieldTable } from '../../components/DateFieldTable';
import { SingleSelect } from '../../components/singleSelect ';
import { SelectItem } from '../../models/SelectItem';
import { ModalTable } from '../../components/ModalTable/ModalTable';
import { DeleteRawTable } from '../../components/DeleteRowTable';
import { UpdateBookingStatus } from './UpdateBookingStatus';
import { removeAccents } from '../../utils/removeAccents';

const useStyles = bookingsTableViewStyle;

interface BookingsTableViewProps {
}

const BookingsTableView: React.FC<BookingsTableViewProps> = () => {

  const classes = useStyles();

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

  const selectStatus: SelectItem[] = [
    {
      value: 'active',
      slug: 'Réservation en cours'
    },
    {
      value: 'archived',
      slug: 'Réservation archivée'
    },
  ]
  const tableData = [
    {
      id: 1,
      date: '2021-10-10',
      name: 'John toee',
      prix: 30,
      produit: 'Omanga Tome 01',
      state: 'active'
    },
    {
      id: 2,
      date: '2021-10-10',
      name: 'John toeee',
      prix: 40,
      produit: 'Omanga Tome 02',
      state: 'active'
    },
    {
      id: 3,
      date: '2021-10-10',
      name: 'John toeeee',
      prix: 50,
      produit: 'Omanga Tome 03',
      state: 'archived'
    },
    {
      id: 4,
      date: '2021-10-10',
      name: 'John yoeee',
      prix: 60,
      produit: 'Omanga Tome 04',
      state: 'archived'
    },
    {
      id: 5,
      date: '2021-10-10',
      name: 'John yoeeee',
      prix: 70,
      produit: 'Omanga Tome 05',
    }, {
      id: 6,
      date: '2021-10-10',
      name: 'John Doee',
      prix: 30,
      produit: 'Omanga Tome 01',
      state: 'active'
    },
    {
      id: 7,
      date: '2021-10-10',
      name: 'John poeee',
      prix: 40,
      produit: 'Omanga Tome 02',
      state: 'active'
    },
    {
      id: 8,
      date: '2021-10-10',
      name: 'John roeeee',
      prix: 50,
      produit: 'Omanga Tome 03',
      state: 'archived'
    },
    {
      id: 9,
      date: '2021-10-10',
      name: 'John boeee',
      prix: 60,
      produit: 'Omanga Tome 04',
      state: 'archived'
    },
  ];

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
    let filteredRows = [...tableData];
    if (idBooking) {
      filteredRows = filteredRows.filter((row) => row.id === Number(idBooking));
    }
    if (date) {
      filteredRows = filteredRows.filter((row) => row.date === date);
    }
    if (customer) {
      filteredRows = filteredRows.filter((row) => removeAccents(row.name).includes(removeAccents(customer)));
    }

    if (status) {
      filteredRows = filteredRows.filter((row) => row.state === status);
    }
    return filteredRows;
  }

  const AllBookings = getFitleredBookings();

  return (
    <>
      <Grid container style={{
        height: '77vh',
        width: '85%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Grid item className={`${classes.bookingsTitle} ${classes.flexVertCenter}`}>
          <p> Réservations
          </p>
        </Grid>
        <Grid container spacing={2} className={classes.selectContainer}>
          <Grid item xs={3}>
            <TextFieldTable label={'ID commande'} value={idBooking} onChange={handleIdBookingChange} />
          </Grid>
          <Grid item xs={3}>
            <DateFieldTable label={'Date'} value={date} onChange={handleDateChange} />
          </Grid>
          <Grid item xs={3}>
            <TextFieldTable label={'Client'} value={customer} onChange={handleCustomerChange} />
          </Grid>
          <Grid item xs={3}>
            <SingleSelect selectItems={selectStatus} selectName={'Etat'} onChange={handleStatusChange} />
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
                  <TableCell>Produit</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AllBookings.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.prix}</TableCell>
                    <TableCell>{row.produit}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" onClick={() => handleBookingArchivate(row.id)} style={{ marginRight: '1rem' }}><SystemUpdateAltIcon /></Button>
                      <Button variant="outlined" size="small" onClick={() => handleDeleteBooking(row.id)}><DeleteOutlineIcon /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <ModalTable open={openUpdateModal} handleClose={handleCloseUpdateModal} >
        <UpdateBookingStatus rowId={idItem} item={"la réservation"} onClose={handleCloseUpdateModal} />
      </ModalTable>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal} >
        <DeleteRawTable rowId={idItem} item={"la réservation"} onClose={handleCloseDeleteModal} />
      </ModalTable>
    </>
  );
};

export { BookingsTableView };