import React from 'react';
import { usersTableViewStyle } from './userTableViewStyle';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { TextFieldTable } from '../../components/TextFieldTable';
import { DateFieldTable } from '../../components/DateFieldTable';
import { SingleSelect } from '../../components/singleSelect ';
import { SelectItem } from '../../models/SelectItem';
import { ModalTable } from '../../components/ModalTable/ModalTable';
import { DeleteRawTable } from '../../components/DeleteRowTable';

const useStyles = usersTableViewStyle;

interface IsAdminSelectItem {
  value: boolean;
  slug: string;
}
interface UsersTableViewProps {
}

const UsersTableView: React.FC<UsersTableViewProps> = () => {

  const classes = useStyles();

  const [idItem, setIdItem] = React.useState<number>(0);
  const [idProduct, setIdProduct] = React.useState<number>();
  const [userName, setUserName] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');
  const [isAdminUser, setIsAdminUser] = React.useState<boolean>(false);

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const selectStatus: SelectItem[] = [
    {
      value: 'true',
      slug: 'Administrateur'
    },
    {
      value: 'false',
      slug: 'Utilisateur'
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

  const handleIsAdminChange = (value: string) => {
    if (value === 'true') {
      setIsAdminUser(true);
    }
    if (value === 'false') {
      setIsAdminUser(false);
    }
  };

  const getFitleredBookings = () => {
    let filteredUsers = [...tableData];

    if (userName) {
      filteredUsers = filteredUsers.filter((user) => user.lastName === userName);
    }
    if (city) {
      filteredUsers = filteredUsers.filter((user) => user.city === city);
    }
    if (isAdminUser !== undefined) {
      filteredUsers = filteredUsers.filter((user) => user.isAdmin === isAdminUser);
    }

    return filteredUsers;
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
          <p> Utilisateur </p>
        </Grid>
        <Grid container spacing={2} className={classes.selectContainer}>
          <Grid item xs={4}>
            <TextFieldTable label={'Nom'} value={userName} onChange={handleUserNameChange} />
          </Grid>
          <Grid item xs={4}>
            <TextFieldTable label={'Nom'} value={city} onChange={handleCityChange} />
          </Grid>
          <Grid item xs={4}>
            <SingleSelect selectItems={selectStatus} selectName={'Administrateur'} onChange={handleIsAdminChange} />
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
                  <TableCell>Admin</TableCell>
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