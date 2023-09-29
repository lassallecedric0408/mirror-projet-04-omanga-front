import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { TextFieldTable } from '../../components/TextFieldTable';
import { ModalTable } from '../../components/ModalTable/ModalTable';
import { DeleteRawTable } from '../../components/DeleteRowTable';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';


import { productsTableViewStyle } from './productsTableViewStyle';
import { ProductForm } from './ProductForm';

const useStyles = productsTableViewStyle;

interface ProductsTableViewProps {
}

const ProductsTableView: React.FC<ProductsTableViewProps> = () => {

  const classes = useStyles();

  const navigate = useNavigate();

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

  const tableData = [
    {
      id: 1,
      nameProduct: 'produit 1',
      price: 20,
      category: '1',
      universe: '1',
    },
    {
      id: 2,
      nameProduct: 'produit 2',
      price: 10,
      category: '2',
      universe: '2',
    }
  ];

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
    let filteredProducts = [...tableData];
    if (idProduct) {
      filteredProducts = filteredProducts.filter((product) => product.id === Number(idProduct));
    }
    if (nameProduct) {
      filteredProducts = filteredProducts.filter((product) => product.nameProduct === nameProduct);
    }

    return filteredProducts;
  }

  const AllData = getFitleredRows();

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
        <Grid item className={`${classes.title} ${classes.flexVertCenter}`}>
          <p> Univers </p>
          <Button variant="outlined" size="small" onClick={() => handleCreate()}><AddIcon /> Ajouter un univers</Button>
        </Grid>
        <Grid container spacing={2} className={classes.selectContainer}>
          <Grid item xs={3}>
            <TextFieldTable label={'ID commande'} value={idProduct} onChange={handleIdProductChange} />
          </Grid>
          <Grid item xs={3}>
            <TextFieldTable label={'Nom du produit'} value={nameProduct} onChange={handleNameProductChange} />
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
                    <TableCell>{row.nameProduct}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>
                      <Button variant="text" onClick={() => navigateToProductId(row.id)}>Afficher le produit</Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" onClick={() => handleUpdate(row)} style={{ marginRight: '1rem' }}><SystemUpdateAltIcon /></Button>
                      <Button variant="outlined" size="small" onClick={() => handleDelete(row.id)}><DeleteOutlineIcon /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <ModalTable open={openCreateModal} handleClose={handleCloseCreateModal} >
        <ProductForm item={"le produit"} onClose={handleCloseCreateModal} />
      </ModalTable>
      <ModalTable open={openUpdateModal} handleClose={handleCloseUpdateModal} >
        <ProductForm row={rowItem} item={"le produit"} onClose={handleCloseUpdateModal} />
      </ModalTable>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal} >
        <DeleteRawTable rowId={idItem} item={"le produit"} onClose={handleCloseDeleteModal} />
      </ModalTable>
    </>

  );
};

export { ProductsTableView };