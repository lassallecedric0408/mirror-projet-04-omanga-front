import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { redirect } from 'react-router';

import { TextFieldTable } from '../../components/TextFieldTable';
import { DateFieldTable } from '../../components/DateFieldTable';
import { ModalTable } from '../../components/ModalTable/ModalTable';
import { DeleteRawTable } from '../../components/DeleteRowTable';
import { removeAccents } from '../../utils/removeAccents';
import { deleteOneCategory, getAllCategories } from '../../services/categories';

import { CategoryForm } from './CategoryForm';

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
import AddIcon from '@mui/icons-material/Add';

import { categoriesTableViewStyle } from './categoriesTableViewStyle';

const useStyles = categoriesTableViewStyle;

interface CategoriesTableViewProps {}

const CategoriesTableView: React.FC<CategoriesTableViewProps> = () => {
  const classes = useStyles();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getAllCategories'],
    queryFn: () => getAllCategories(),
  });

  const [idItem, setIdItem] = useState<number>(0);
  const [rowItem, setRowItem] = useState<any>();
  const [idCategory, setIdCategory] = useState<number>();
  const [date, setDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');

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

  const handleIdCategoryChange = (value: string | number) => {
    setIdCategory(value as number);
  };

  const handleDateChange = (value: string | number) => {
    setDate(value as string);
  };

  const handleCategoryChange = (value: string | number) => {
    setCategory(value as string);
  };

  const getFitleredRows = () => {
    let filteredRows = [...(data?.data ?? [])];
    if (idCategory) {
      filteredRows = filteredRows.filter(
        (row) => row.id === Number(idCategory)
      );
    }
    if (date) {
      filteredRows = filteredRows.filter((row) => row.created_at === date);
    }
    if (category) {
      filteredRows = filteredRows.filter((row) =>
        removeAccents(row.name).includes(removeAccents(category))
      );
    }

    return filteredRows;
  };

  const AllData = getFitleredRows();

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
          <p> Catégories</p>
          <Button
            variant='outlined'
            size='small'
            onClick={() => handleCreate()}
          >
            <AddIcon /> Ajouter une catégorie
          </Button>
        </Grid>
        <Grid container spacing={2} className={classes.selectContainer}>
          <Grid item xs={4}>
            <TextFieldTable
              label={'ID commande'}
              value={idCategory}
              onChange={handleIdCategoryChange}
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
              label={'Catégorie'}
              value={category}
              onChange={handleCategoryChange}
            />
          </Grid>
        </Grid>
        <Grid item className={classes.tableContainer}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date de création</TableCell>
                  <TableCell>Catégorie</TableCell>
                  {/* <TableCell>Nb Univers</TableCell>
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
                    {/* <TableCell>{row.universeNumber}</TableCell>
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
        <CategoryForm item={'la catégorie'} onClose={handleCloseCreateModal} />
      </ModalTable>
      <ModalTable open={openUpdateModal} handleClose={handleCloseUpdateModal}>
        <CategoryForm
          row={rowItem}
          item={'la catégorie'}
          onClose={handleCloseUpdateModal}
        />
      </ModalTable>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal}>
        <DeleteRawTable
          rowId={idItem}
          item={'la catégorie'}
          onClose={handleCloseDeleteModal}
          deleteRow={(idItem: number) => deleteOneCategory(idItem)}
          userMail={''}
        />
      </ModalTable>
    </>
  );
};

export { CategoriesTableView };
