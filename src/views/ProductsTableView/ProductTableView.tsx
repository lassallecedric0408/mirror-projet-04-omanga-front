import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import useAuthStore from "../../states/OmangaStore";
import { useQuery } from "react-query";

import { DeleteProduct } from "./DeleteProduct";
import { Product } from "../../models/Product";
import { getAllProducts } from "../../services/products";
import { TextFieldTable } from "../../components/TextFieldTable";
import { ModalTable } from "../../components/ModalTable/ModalTable";
import { ProductForm } from "./ProductForm";
import { removeAccents } from "../../utils/removeAccents";

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
import { materialUITheme } from "../../utils/materialUITheme";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import AddIcon from "@mui/icons-material/Add";

interface ProductsTableViewProps {}

const ProductsTableView: React.FC<ProductsTableViewProps> = () => {
  const theme = useTheme();

  const user = useAuthStore((state) => state.user.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  if (!user) {
    throw new Error("User not found");
  }

  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: () => getAllProducts(),
  });

  const [product, setProduct] = useState<Product>({
    id: 0,
    stock: 0,
    name: "",
    description: "",
    price: 0,
    image_url: "",
    category_id: 0,
    universe_id: 0,
    category: {
      name: "string",
    },
    universe: {
      name: "",
    },
    reviews: [],
    orders: [],
  });
  const [rowItem, setRowItem] = useState<Product>();
  const [idProduct, setIdProduct] = useState<number>();
  const [nameProduct, setNameProduct] = useState<string>("");

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

  const handleDelete = (row: Product) => {
    setProduct(row);
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
        removeAccents(row.name).includes(removeAccents(nameProduct)),
      );
    }

    return filteredRows;
  };

  const AllData = getFitleredRows();

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
            justifyContent: "space-between",
          }}
        >
          <p> Produit </p>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleCreate()}
          >
            <AddIcon /> Ajouter un Produit
          </Button>
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
              value={idProduct}
              onChange={handleIdProductChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldTable
              label={"Nom du produit"}
              value={nameProduct}
              onChange={handleNameProductChange}
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
                        variant="text"
                        onClick={() => navigateToProductId(row.id)}
                      >
                        Afficher le produit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleUpdate(row)}
                        style={{ marginRight: "1rem" }}
                      >
                        <SystemUpdateAltIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleDelete(row)}
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
        <ProductForm
          onClose={handleCloseCreateModal}
          status="create"
          userMail={user.email}
        />
      </ModalTable>
      <ModalTable open={openUpdateModal} handleClose={handleCloseUpdateModal}>
        <ProductForm
          row={rowItem}
          onClose={handleCloseUpdateModal}
          status="update"
          userMail={user.email}
        />
      </ModalTable>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal}>
        <DeleteProduct
          row={product}
          onClose={handleCloseDeleteModal}
          userMail={user.email}
        />
      </ModalTable>
    </>
  );
};

export { ProductsTableView };
