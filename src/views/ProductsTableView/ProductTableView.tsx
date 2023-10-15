import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { redirect, useNavigate } from 'react-router-dom';

import { deleteOneProduct, getAllProducts } from '../../services/products';
import { TextFieldTable } from '../../components/TextFieldTable';
import { ModalTable } from '../../components/ModalTable/ModalTable';
import { DeleteRawTable } from '../../components/DeleteRowTable';
import { productsTableViewStyle } from './productsTableViewStyle';
import { ProductForm } from './ProductForm';
import { removeAccents } from '../../utils/removeAccents';

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

const useStyles = productsTableViewStyle;

interface ProductsTableViewProps {}

const ProductsTableView: React.FC<ProductsTableViewProps> = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getAllProducts'],
    queryFn: () => getAllProducts(),
  });

  const [idItem, setIdItem] = useState<number>(0);
  const [rowItem, setRowItem] = useState<any>();
  const [idProduct, setIdProduct] = useState<number>();
  const [nameProduct, setNameProduct] = useState<string>('');

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

  const handleNameProductChange = (value: string | number) => {
    setNameProduct(value as string);
  };

  const navigateToProductId = (id: number) => {
    navigate(`/product/${id}`);
  };

  const getFitleredRows = () => {
    let filteredRows = [...(data?.data ?? [])];
    if (idProduct) {
      filteredRows = filteredRows.filter((row) => row.id === Number(idProduct));
    }
    if (nameProduct) {
      filteredRows = filteredRows.filter((row) =>
        removeAccents(row.name).includes(removeAccents(nameProduct))
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
          <p> Produit </p>
          <Button
            variant='outlined'
            size='small'
            onClick={() => handleCreate()}
          >
            <AddIcon /> Ajouter un Produit
          </Button>
        </Grid>
        <Grid container spacing={2} className={classes.selectContainer}>
          <Grid item xs={3}>
            <TextFieldTable
              label={'ID commande'}
              value={idProduct}
              onChange={handleIdProductChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldTable
              label={'Nom du produit'}
              value={nameProduct}
              onChange={handleNameProductChange}
            />
          </Grid>
        </Grid>
        <Grid item className={classes.tableContainer}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Produits</TableCell>
                  <TableCell>Prix</TableCell>
                  <TableCell>Liens</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AllData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.price}</TableCell>
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
        <ProductForm item={'le produit'} onClose={handleCloseCreateModal} />
      </ModalTable>
      <ModalTable open={openUpdateModal} handleClose={handleCloseUpdateModal}>
        <ProductForm
          row={rowItem}
          item={'le produit'}
          onClose={handleCloseUpdateModal}
        />
      </ModalTable>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal}>
        <DeleteRawTable
          rowId={idItem}
          item={'le produit'}
          onClose={handleCloseDeleteModal}
          deleteRow={(idItem: number) => deleteOneProduct(idItem)}
          userMail={''}
        />
      </ModalTable>
    </>
  );
};

export { ProductsTableView };
