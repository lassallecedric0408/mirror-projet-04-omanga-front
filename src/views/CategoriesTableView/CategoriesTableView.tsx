import React, { useState } from "react";
import useAuthStore from "../../states/OmangaStore";
import { useQuery } from "react-query";
import { redirect } from "react-router";

import { TextFieldTable } from "../../components/TextFieldTable";
import { ModalTable } from "../../components/ModalTable/ModalTable";
import { getAllCategories } from "../../services/categories";
import { CategoryForm } from "./CategoryForm";

import { MultipleSelect } from "../../components/multipleSelect";
import { DeleteCategory } from "./DeleteCategory";
import { Category } from "../../models/Category";
import { materialUITheme } from "../../utils/materialUITheme";

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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import AddIcon from "@mui/icons-material/Add";

const CategoriesTableView: React.FC = () => {
  const theme = useTheme();

  const user = useAuthStore((state) => state.user.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  if (!user) {
    throw new Error("User not found");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: () => getAllCategories(),
  });

  const categoriesSelect = data
    ? data.data.map((category) => category.name)
    : [];

  const [productsSelectCategories, setProductsSelectCategories] = useState<
    string[]
  >([]);

  const [idCategory, setIdCategory] = useState<number>();
  const [categoryRow, setCategoryRow] = useState<Category>({
    id: 1,
    name: "",
    image_url: "",
    created_at: "",
  });

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

  const handleUpdate = (row: Category) => {
    setCategoryRow(row);
    handleOpenUpdateModal();
  };

  const handleDelete = (row: Category) => {
    setCategoryRow(row);
    handleOpenDeleteModal();
  };

  const handleIdCategoryChange = (value: string | number) => {
    setIdCategory(value as number);
  };

  const handleCategoriesChange = (value: string[]) => {
    setProductsSelectCategories(value);
  };

  const getFitleredRows = () => {
    let filteredRows = [...(data?.data ?? [])];
    if (idCategory) {
      filteredRows = filteredRows.filter(
        (row) => row.id === Number(idCategory),
      );
    }
    if (productsSelectCategories.length > 0) {
      filteredRows = filteredRows.filter((category) =>
        productsSelectCategories.includes(category.name),
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
        sx={{
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
          <p> Catégories</p>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleCreate()}
          >
            <AddIcon /> Ajouter une catégorie
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
          <Grid item xs={4}>
            <TextFieldTable
              label={"ID commande"}
              value={idCategory}
              onChange={handleIdCategoryChange}
            />
          </Grid>
          <Grid item xs={4}>
            <MultipleSelect
              selectItems={categoriesSelect}
              selectName={"Catégories"}
              onChange={handleCategoriesChange}
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
                  <TableCell>Date de création</TableCell>
                  <TableCell>Catégorie</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AllData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.created_at}</TableCell>
                    <TableCell>{row.name}</TableCell>
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
        <CategoryForm
          onClose={handleCloseCreateModal}
          userMail={user?.email}
          status="create"
        />
      </ModalTable>
      <ModalTable open={openUpdateModal} handleClose={handleCloseUpdateModal}>
        <CategoryForm
          row={categoryRow}
          onClose={handleCloseUpdateModal}
          userMail={user?.email}
          status="update"
        />
      </ModalTable>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal}>
        <DeleteCategory
          row={categoryRow}
          onClose={handleCloseDeleteModal}
          userMail={user?.email}
        />
      </ModalTable>
    </>
  );
};

export { CategoriesTableView };
