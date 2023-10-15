import React, { useState } from 'react';
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { TextFieldTable } from '../../components/TextFieldTable';
import { DateFieldTable } from '../../components/DateFieldTable';
import { ModalTable } from '../../components/ModalTable/ModalTable';
import { DeleteRawTable } from '../../components/DeleteRowTable';
import { UniverseForm } from './UniverseForm';
import AddIcon from '@mui/icons-material/Add';

import { universesTableViewStyle } from './universesTableViewStyle';
import { redirect } from 'react-router';
import { deleteOneUniverse, getAllUniverses } from '../../services/universes';
import { useQuery } from 'react-query';

const useStyles = universesTableViewStyle;

interface UniversesTableViewProps {}

const UniversesTableView: React.FC<UniversesTableViewProps> = () => {
  const classes = useStyles();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getAllBookings'],
    queryFn: () => getAllUniverses(),
  });

  const [idItem, setIdItem] = useState<number>(0);
  const [rowItem, setRowItem] = useState<any>();
  const [idProduct, setIdProduct] = useState<number>();
  const [date, setDate] = useState<string>('');
  const [universe, setUniverse] = useState<string>('');

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleCreate = () => {
    handleOpenCreateModal();
  };

  const handleUpdate = (row: any) => {
    setRowItem(row);
    handleOpenUpdateModal();
  };

  const handleDelete = (id: number) => {
    setIdItem(id);
    handleOpenDeleteModal();
  };

  const handleIdProductChange = (value: string | number) => {
    setIdProduct(value as number);
  };

  const handleDateChange = (value: string | number) => {
    setDate(value as string);
  };

  const handleUniverseChange = (value: string | number) => {
    setUniverse(value as string);
  };

  const removeAccents = (research: string): string =>
    research
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const getFitleredRows = () => {
    let filteredRows = [...(data?.data ?? [])];
    if (idProduct) {
      filteredRows = filteredRows.filter((row) => row.id === Number(idProduct));
    }
    if (date) {
      filteredRows = filteredRows.filter((row) => row.created_at === date);
    }
    if (universe) {
      filteredRows = filteredRows.filter((row) =>
        removeAccents(row.name).includes(removeAccents(universe))
      );
    }

    return filteredRows;
  };

  const AllData = getFitleredRows();

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
        <Grid item className={`${classes.title} ${classes.flexVertCenter}`}>
          <p> Univers </p>
          <Button
            variant='outlined'
            size='small'
            onClick={() => handleCreate()}
          >
            <AddIcon /> Ajouter un univers
          </Button>
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
              label={'Univers'}
              value={universe}
              onChange={handleUniverseChange}
            />
          </Grid>
        </Grid>
        <Grid item className={classes.tableContainer}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID univers</TableCell>
                  <TableCell>Date de création</TableCell>
                  <TableCell>Univers</TableCell>
                  {/* <TableCell>Nb Catégorie</TableCell>
                  <TableCell>Nb Produits</TableCell> */}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AllData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.created_at}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    {/* <TableCell>{row.categoryNumber}</TableCell>
                    <TableCell>{row.productNumber}</TableCell> */}
                    <TableCell>
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={() => handleUpdate(row)}
                        style={{ marginRight: '1rem' }}
                      >
                        <SystemUpdateAltIcon />
                      </Button>
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={() => handleDelete(row.id)}
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
      <ModalTable open={openCreateModal} handleClose={handleCloseCreateModal}>
        <UniverseForm item={"l'univers"} onClose={handleCloseCreateModal} />
      </ModalTable>
      <ModalTable open={openUpdateModal} handleClose={handleCloseUpdateModal}>
        <UniverseForm
          row={rowItem}
          item={"l'univers"}
          onClose={handleCloseUpdateModal}
        />
      </ModalTable>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal}>
        <DeleteRawTable
          rowId={idItem}
          item={"l'univers"}
          onClose={handleCloseDeleteModal}
          deleteRow={(idItem: number) => deleteOneUniverse(idItem)}
          userMail={''}
        />
      </ModalTable>
    </>
  );
};

export { UniversesTableView };
