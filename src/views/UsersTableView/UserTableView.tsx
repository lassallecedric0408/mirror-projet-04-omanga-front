import React from 'react';
import { usersTableViewStyle } from './userTableViewStyle';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TextFieldTable } from '../../components/TextFieldTable';
import { SingleSelect } from '../../components/singleSelect ';
import { SelectItem } from '../../models/SelectItem';
import { ModalTable } from '../../components/ModalTable/ModalTable';
import { DeleteRawTable } from '../../components/DeleteRowTable';
import { removeAccents } from '../../utils/removeAccents';

const useStyles = usersTableViewStyle;

interface UsersTableViewProps {
}

const UsersTableView: React.FC<UsersTableViewProps> = () => {

  const classes = useStyles();

  const [idItem, setIdItem] = React.useState<number>(0);
  const [userName, setUserName] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');
  const [isAdminUser, setIsAdminUser] = React.useState<string | 'users' | 'admin' | 'user'>('users');

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const selectStatus: SelectItem[] = [
    {
      value: 'users',
      slug: 'Administrateurs et utilisateurs'
    },

    {
      value: 'admin',
      slug: 'Administrateurs'
    },
    {
      value: 'user',
      slug: 'Utilisateurs'
    },
  ];

  const tableData = [
    {
      id: 1,
      date: '2021-10-10',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@mail.com',
      city: 'Paris',
      isAdmin: false,
    },
    {
      id: 2,
      date: '2021-10-10',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@mail.com',
      city: 'Paris',
      isAdmin: true,
    },
  ];

  const handleDeleteUser = (id: number) => {
    setIdItem(id);
    handleOpenDeleteModal();
  };

  const handleUserNameChange = (value: string | number) => {
    setUserName(value as string);
  };

  const handleCityChange = (value: string | number) => {
    setCity(value as string);
  };

  const handleIsAdminChange = (value: string | 'users' | 'admin' | 'user') => {
    setIsAdminUser(value);
  };

  const getFitleredRows = () => {
    let filteredRows = [...tableData];

    if (userName) {
      filteredRows = filteredRows.filter((row) => removeAccents(row.lastName).includes(removeAccents(userName)));
    }
    if (city) {
      filteredRows = filteredRows.filter((row) => removeAccents(row.city).includes(removeAccents(city)));
    }
    if (isAdminUser === 'admin') {
      filteredRows = filteredRows.filter((row) => row.isAdmin);
    }
    if (isAdminUser === 'user') {
      filteredRows = filteredRows.filter((row) => !row.isAdmin);
    }

    return filteredRows;
  }

  const AllBookings = getFitleredRows();

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
          <p> Utilisateur </p>
        </Grid>
        <Grid container spacing={2} className={classes.selectContainer}>
          <Grid item xs={4}>
            <TextFieldTable label={'Nom'} value={userName} onChange={handleUserNameChange} />
          </Grid>
          <Grid item xs={4}>
            <TextFieldTable label={'Ville'} value={city} onChange={handleCityChange} />
          </Grid>
          <Grid item xs={4}>
            <SingleSelect selectItems={selectStatus} selectName={'Admin et utilisateurs'} onChange={handleIsAdminChange} />
          </Grid>
        </Grid>
        <Grid item className={classes.tableContainer}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Ville</TableCell>
                  <TableCell>Droit</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AllBookings.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.isAdmin ? 'Administrateur' : 'Utilisateur'}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" onClick={() => handleDeleteUser(row.id)}><DeleteOutlineIcon /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal} >
        <DeleteRawTable rowId={idItem} item={"l'utilisateur"} onClose={handleCloseDeleteModal} />
      </ModalTable>
    </>
  );
};

export { UsersTableView };