import React, { useState } from "react";
import { redirect } from "react-router-dom";
import useAuthStore from "../../states/OmangaStore";
import { useQuery } from "react-query";

import { TextFieldTable } from "../../components/TextFieldTable";
import { ModalTable } from "../../components/ModalTable/ModalTable";
import { MultipleSelect } from "../../components/multipleSelect";
import { UniverseForm } from "./UniverseForm";
import { getAllUniverses } from "../../services/universes";
import { DeleteUniverse } from "./DeleteUniverse";
import { Universe } from "../../models/Universe";

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
import { materialUITheme } from "../../utils/materialUITheme";

const UniversesTableView: React.FC = () => {
  const theme = useTheme();

  const user = useAuthStore((state) => state.user.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  if (!user) {
    throw new Error("User not found");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllUniverses"],
    queryFn: () => getAllUniverses(),
  });

  const universesSelect = data
    ? data.data.map((universe) => universe.name)
    : [];

  const [productsSelectUniverses, setProductsSelectUniverses] = useState<
    string[]
  >([]);

  const [rowItem, setRowItem] = useState<any>();
  const [idProduct, setIdProduct] = useState<number>();
  const [universeRow, setUniverseRow] = useState<Universe>({
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

  const handleUpdate = (row: Universe) => {
    setRowItem(row);
    handleOpenUpdateModal();
  };

  const handleDelete = (row: Universe) => {
    setUniverseRow(row);
    handleOpenDeleteModal();
  };

  const handleIdProductChange = (value: string | number) => {
    setIdProduct(value as number);
  };

  const handleUniversChange = (value: string[]) => {
    setProductsSelectUniverses(value);
  };

  const getFitleredRows = () => {
    let filteredRows = [...(data?.data ?? [])];
    if (idProduct) {
      filteredRows = filteredRows.filter((row) => row.id === Number(idProduct));
    }
    if (productsSelectUniverses.length > 0) {
      filteredRows = filteredRows.filter((row) =>
        productsSelectUniverses.includes(row.name),
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
          <p> Univers </p>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleCreate()}
          >
            <AddIcon /> Ajouter un univers
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
          <Grid item xs={6}>
            <TextFieldTable
              label={"ID commande"}
              value={idProduct}
              onChange={handleIdProductChange}
            />
          </Grid>
          <Grid item xs={6}>
            <MultipleSelect
              selectItems={universesSelect}
              selectName={"Univers"}
              onChange={handleUniversChange}
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
                  <TableCell>ID univers</TableCell>
                  <TableCell>Date de création</TableCell>
                  <TableCell>Univers</TableCell>
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
        <UniverseForm
          onClose={handleCloseCreateModal}
          userMail={user.email}
          status="create"
        />
      </ModalTable>
      <ModalTable open={openUpdateModal} handleClose={handleCloseUpdateModal}>
        <UniverseForm
          row={rowItem}
          onClose={handleCloseUpdateModal}
          userMail={user.email}
          status="update"
        />
      </ModalTable>
      <ModalTable open={openDeleteModal} handleClose={handleCloseDeleteModal}>
        <DeleteUniverse
          row={universeRow}
          onClose={handleCloseDeleteModal}
          userMail={user.email}
        />
      </ModalTable>
    </>
  );
};

export { UniversesTableView };
